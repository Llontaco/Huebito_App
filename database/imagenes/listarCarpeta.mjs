// Genera image/LEEME.md: cómo subir fotos a la carpeta y, para cada receta,
// el nombre de archivo exacto que tiene que llevar su foto y si ya tiene una.
//
// Uso:
//   node database/imagenes/listarCarpeta.mjs
//
// Conviene volver a correrlo cuando cambian las recetas o después de subir
// fotos, para que la lista de pendientes quede al día.

import { readFile, readdir, writeFile, mkdir } from 'node:fs/promises';
import path from 'node:path';
import { neonConfig, Pool } from '@neondatabase/serverless';
import ws from 'ws';
import { slugImagen, CARPETA_IMAGENES, EXTENSIONES_IMAGEN } from '../../src/core/images/slugImagen.js';

neonConfig.webSocketConstructor = ws;

const root = path.resolve(import.meta.dirname, '..', '..');
const dirImagenes = path.join(root, CARPETA_IMAGENES);
const ORDEN = ['desayunos', 'almuerzos', 'sopas', 'entradas', 'cenas', 'bebidas'];

async function obtenerConnectionString() {
  if (process.env.DATABASE_URL) return process.env.DATABASE_URL;
  const ruta = path.resolve(root, '..', 'Huebito_API', '.env');
  const contenido = await readFile(ruta, 'utf-8');
  const linea = contenido.split(/\r?\n/).find((l) => l.trimStart().startsWith('DATABASE_URL='));
  return linea.slice(linea.indexOf('=') + 1).trim().replace(/^["']|["']$/g, '');
}

// "desayunos/pan-con-palta" -> "pan-con-palta.png" (el archivo tal como está)
async function archivosEnCarpeta() {
  const mapa = new Map();
  for (const categoria of ORDEN) {
    await mkdir(path.join(dirImagenes, categoria), { recursive: true });
    for (const archivo of await readdir(path.join(dirImagenes, categoria))) {
      const ext = archivo.split('.').pop().toLowerCase();
      if (!EXTENSIONES_IMAGEN.includes(ext)) continue;
      mapa.set(`${categoria}/${archivo.replace(/\.[^.]+$/, '').toLowerCase()}`, archivo);
    }
  }
  return mapa;
}

const pool = new Pool({ connectionString: await obtenerConnectionString() });
try {
  const { rows } = await pool.query(
    `SELECT r.nombre, c.slug AS categoria, (r.imagen_datos IS NOT NULL) AS en_base
       FROM recetas r JOIN categorias c ON c.id = r.categoria_id
      ORDER BY c.slug, r.nombre`
  );
  const enCarpeta = await archivosEnCarpeta();

  const secciones = [];
  const resumen = [];
  for (const categoria of ORDEN) {
    const recetas = rows.filter((r) => r.categoria === categoria);
    let deCarpeta = 0;
    let deBase = 0;
    const filas = recetas.map((r) => {
      const slug = slugImagen(r.nombre);
      const archivo = enCarpeta.get(`${categoria}/${slug}`);
      if (archivo) deCarpeta += 1;
      else if (r.en_base) deBase += 1;
      const estado = archivo ? `en la carpeta (${archivo})` : r.en_base ? 'foto en la base' : '**falta**';
      return `| ${r.nombre} | \`${slug}.jpg\` | ${estado} |`;
    });
    const faltan = recetas.length - deCarpeta - deBase;
    resumen.push(`| ${categoria} | ${recetas.length} | ${deCarpeta} | ${deBase} | ${faltan} |`);
    secciones.push(
      `## ${categoria}\n\nCarpeta: \`image/${categoria}/\`\n\n| Receta | Archivo | Estado |\n|---|---|---|\n${filas.join('\n')}`
    );
  }

  const contenido = `# Fotos de las recetas

Sube aquí las fotos de los platos y bebidas. La app las toma de esta carpeta
al desplegarse y las muestra en lugar de la foto guardada en la base.

## Cómo subir una foto

1. Elige la subcarpeta de la categoría: \`desayunos\`, \`almuerzos\`, \`sopas\`, \`entradas\`, \`cenas\` o \`bebidas\`.
2. Nombra el archivo como indica la tabla de abajo: el nombre de la receta en
   minúsculas, sin tildes ni ñ, y con guiones en lugar de espacios.
   "Pan con palta" va como \`pan-con-palta.jpg\`.
3. Formatos: \`.jpg\`, \`.jpeg\`, \`.png\` o \`.webp\`. Se ven mejor en horizontal
   (4:3, por ejemplo 1200 × 900) y conviene que pesen menos de 300 KB.
4. Haz commit y push: Vercel vuelve a desplegar la app con la foto nueva.

Para cambiar una foto, reemplaza el archivo con el mismo nombre. Para quitarla,
bórralo y la receta vuelve a la foto de la base, o al ícono si no tiene.

Si una foto no es tuya y su licencia pide nombrar al autor, agrega su crédito
en \`creditos.json\` dentro de esta carpeta, por ejemplo:

    { "cenas/pie-de-limon.jpg": { "autor": "Nombre", "licencia": "CC BY 4.0", "fuente": "https://..." } }

y la app lo mostrará debajo de la foto. Tus fotos propias no necesitan nada.

Esta lista se genera con \`node database/imagenes/listarCarpeta.mjs\`.

## Resumen

| Categoría | Recetas | En la carpeta | Foto en la base | Faltan |
|---|---|---|---|---|
${resumen.join('\n')}

${secciones.join('\n\n')}
`;

  await writeFile(path.join(dirImagenes, 'LEEME.md'), contenido);
  console.log(`image/LEEME.md generado.\n\n| Categoría | Recetas | En la carpeta | Foto en la base | Faltan |\n${resumen.join('\n')}`);
} finally {
  await pool.end();
}
