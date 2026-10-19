// Aplica en Neon la propuesta de cenas y de momentos de bebidas que vive en
// esta carpeta, después de revisarla:
//
//   cenas.json             recetas de la categoría "cenas" (nueva)
//   bebidas-momentos.json  en qué momento del día encaja cada bebida
//
// Uso:
//   node database/propuesta/aplicar-propuesta.mjs --momentos
//   node database/propuesta/aplicar-propuesta.mjs --cenas
//   node database/propuesta/aplicar-propuesta.mjs --momentos --cenas
//
// Es idempotente: se puede correr varias veces. Con --cenas, la categoría
// queda igual que cenas.json: inserta las que faltan, actualiza las que ya
// están (por nombre) y BORRA las cenas de la base que ya no estén en el
// archivo. Así, para descartar una cena basta con quitarla del JSON y volver
// a correrlo. Solo toca recetas de la categoría "cenas".
//
// Una entrada con "copiar_de_id" no trae datos propios: es una receta que ya
// existe (por ejemplo un desayuno de lonche) y se copia entera a "cenas",
// foto incluida. Su "nombre" tiene que coincidir con el de la original.
//
// Las credenciales salen de DATABASE_URL o del .env de Huebito_API, igual
// que en database/seed-neon.mjs.

import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { neonConfig, Pool } from '@neondatabase/serverless';
import ws from 'ws';

neonConfig.webSocketConstructor = ws;

const aqui = import.meta.dirname;
const rutaEnvBackend = path.resolve(aqui, '..', '..', '..', 'Huebito_API', '.env');
const MOMENTOS_VALIDOS = ['desayuno', 'almuerzo', 'cena'];

async function obtenerConnectionString() {
  if (process.env.DATABASE_URL) return process.env.DATABASE_URL;
  const contenido = await readFile(rutaEnvBackend, 'utf-8').catch(() => null);
  const linea = contenido?.split(/\r?\n/).find((l) => l.trimStart().startsWith('DATABASE_URL='));
  if (!linea) throw new Error(`Define DATABASE_URL o créala en ${rutaEnvBackend}.`);
  return linea.slice(linea.indexOf('=') + 1).trim().replace(/^["']|["']$/g, '');
}

async function leerJson(nombre) {
  return JSON.parse(await readFile(path.join(aqui, nombre), 'utf-8'));
}

async function aplicarMomentos(client) {
  const bebidas = await leerJson('bebidas-momentos.json');
  for (const b of bebidas) {
    const invalidos = b.momentos.filter((m) => !MOMENTOS_VALIDOS.includes(m));
    if (invalidos.length) throw new Error(`Momento inválido en "${b.nombre}": ${invalidos.join(', ')}`);
  }

  // Un solo UPDATE para todas: unnest arma una tabla (id, momentos) a partir
  // de dos arreglos paralelos. Los momentos viajan como texto JSON porque un
  // arreglo de arreglos no se puede pasar como parámetro de forma portable.
  const { rowCount } = await client.query(
    `UPDATE recetas r
        SET momentos = ARRAY(SELECT jsonb_array_elements_text(d.momentos::jsonb))
       FROM unnest($1::int[], $2::text[]) AS d(id, momentos)
      WHERE r.id = d.id
        AND r.categoria_id = (SELECT id FROM categorias WHERE slug = 'bebidas')`,
    [bebidas.map((b) => b.id), bebidas.map((b) => JSON.stringify(b.momentos))]
  );
  console.log(`Momentos: ${rowCount} de ${bebidas.length} bebidas actualizadas.`);
  if (rowCount !== bebidas.length) {
    throw new Error('Algunas bebidas del JSON no existen en la base: revisa los ids.');
  }
}

// Columnas que se copian tal cual de la receta original: todo menos el id y
// la categoría, para que la copia se vea igual (con su foto y su crédito).
const COLUMNAS_COPIA = [
  'descripcion', 'ingredientes', 'preparacion', 'tiempo_minutos', 'dificultad', 'imagen_asset',
  'bebida', 'acompanamiento', 'video_url', 'imagen_datos', 'imagen_mime', 'imagen_ancho',
  'imagen_alto', 'imagen_bytes', 'imagen_fuente', 'imagen_autor', 'imagen_licencia',
  'imagen_query', 'imagen_titulo',
];

async function copiarReceta(client, categoriaId, c) {
  const {
    rows: [original],
  } = await client.query('SELECT nombre FROM recetas WHERE id = $1', [c.copiar_de_id]);
  if (!original) throw new Error(`No existe la receta ${c.copiar_de_id} para copiar "${c.nombre}".`);
  if (original.nombre !== c.nombre) {
    throw new Error(`La receta ${c.copiar_de_id} se llama "${original.nombre}", no "${c.nombre}".`);
  }

  const { rowCount } = await client.query(
    `UPDATE recetas d SET ${COLUMNAS_COPIA.map((col) => `${col} = s.${col}`).join(', ')}
       FROM recetas s
      WHERE s.id = $2 AND d.categoria_id = $1 AND d.nombre = s.nombre`,
    [categoriaId, c.copiar_de_id]
  );
  if (rowCount > 0) return 'actualizada';

  await client.query(
    `INSERT INTO recetas (categoria_id, nombre, ${COLUMNAS_COPIA.join(', ')})
     SELECT $1, nombre, ${COLUMNAS_COPIA.join(', ')} FROM recetas WHERE id = $2`,
    [categoriaId, c.copiar_de_id]
  );
  return 'insertada';
}

async function aplicarCenas(client) {
  const cenas = await leerJson('cenas.json');
  const nombres = cenas.map((c) => c.nombre);
  if (new Set(nombres).size !== nombres.length) throw new Error('Hay nombres de cena repetidos en cenas.json.');

  const {
    rows: [categoria],
  } = await client.query(
    `INSERT INTO categorias (nombre, slug) VALUES ('Cenas', 'cenas')
     ON CONFLICT (slug) DO UPDATE SET nombre = EXCLUDED.nombre
     RETURNING id`
  );

  // Por si alguna vez se insertaron filas con id explícito sin mover la
  // secuencia: así el próximo INSERT no choca con un id que ya existe.
  await client.query(
    `SELECT setval(pg_get_serial_sequence('recetas', 'id'), (SELECT COALESCE(MAX(id), 1) FROM recetas))`
  );

  const { rows: borradas } = await client.query(
    `DELETE FROM recetas WHERE categoria_id = $1 AND NOT (nombre = ANY($2::text[])) RETURNING nombre`,
    [categoria.id, nombres]
  );

  let insertadas = 0;
  let actualizadas = 0;
  for (const c of cenas) {
    if (c.copiar_de_id) {
      const r = await copiarReceta(client, categoria.id, c);
      if (r === 'insertada') insertadas += 1;
      else actualizadas += 1;
      continue;
    }
    const valores = [
      categoria.id,
      c.nombre,
      c.descripcion,
      JSON.stringify(c.ingredientes),
      JSON.stringify(c.preparacion),
      c.tiempo_minutos,
      c.dificultad,
      c.bebida ?? null,
      c.acompanamiento ?? null,
    ];
    const { rowCount } = await client.query(
      `UPDATE recetas
          SET descripcion = $3, ingredientes = $4::jsonb, preparacion = $5::jsonb,
              tiempo_minutos = $6, dificultad = $7, bebida = $8, acompanamiento = $9
        WHERE categoria_id = $1 AND nombre = $2`,
      valores
    );
    if (rowCount > 0) {
      actualizadas += 1;
      continue;
    }
    await client.query(
      `INSERT INTO recetas
         (categoria_id, nombre, descripcion, ingredientes, preparacion, tiempo_minutos, dificultad, bebida, acompanamiento)
       VALUES ($1, $2, $3, $4::jsonb, $5::jsonb, $6, $7, $8, $9)`,
      valores
    );
    insertadas += 1;
  }

  console.log(
    `Cenas: ${insertadas} insertadas, ${actualizadas} actualizadas, ${borradas.length} borradas` +
      (borradas.length ? ` (${borradas.map((b) => b.nombre).join(', ')})` : '') +
      '.'
  );
}

const hacerMomentos = process.argv.includes('--momentos');
const hacerCenas = process.argv.includes('--cenas');
if (!hacerMomentos && !hacerCenas) {
  console.error('Indica qué aplicar: --momentos, --cenas o ambos.');
  process.exit(1);
}

const pool = new Pool({ connectionString: await obtenerConnectionString() });
const client = await pool.connect();
try {
  // Todo o nada: si algo falla a mitad de camino, la base queda como estaba.
  await client.query('BEGIN');
  if (hacerMomentos) await aplicarMomentos(client);
  if (hacerCenas) await aplicarCenas(client);
  await client.query('COMMIT');
} catch (error) {
  await client.query('ROLLBACK');
  console.error('No se aplicó nada:', error.message);
  process.exitCode = 1;
} finally {
  client.release();
  await pool.end();
}
