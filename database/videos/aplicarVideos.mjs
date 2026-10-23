// Aplica los videos de database/videos/videos.json:
//   1. actualiza recetas.video_url en Neon (por id, comprobando el nombre), y
//   2. escribe el mismo enlace en el seed del front (src/core/database/seed),
//      para que la app sin conexión también tenga el video.
//
// Uso:
//   node database/videos/aplicarVideos.mjs           # aplica todo
//   node database/videos/aplicarVideos.mjs --dry     # solo muestra qué haría
//   node database/videos/aplicarVideos.mjs --solo-seed   # no toca Neon
//
// videos.json es una lista de { recetaId, categoria, nombre, videoUrl, titulo, canal, duracion }.
// Un videoUrl null deja la receta sin video.
//
// Credenciales: DATABASE_URL del entorno o, si no está, del .env de Huebito_API.

import { readFile, writeFile, readdir } from 'node:fs/promises';
import path from 'node:path';
import { neonConfig, Pool } from '@neondatabase/serverless';
import ws from 'ws';

neonConfig.webSocketConstructor = ws;

const root = path.resolve(import.meta.dirname, '..', '..');
const rutaEnvBackend = path.resolve(root, '..', 'Huebito_API', '.env');
const dirSeed = path.join(root, 'src', 'core', 'database', 'seed', 'recetas');

const DRY = process.argv.includes('--dry');
const SOLO_SEED = process.argv.includes('--solo-seed');

async function obtenerConnectionString() {
  if (process.env.DATABASE_URL) return process.env.DATABASE_URL;
  const contenido = await readFile(rutaEnvBackend, 'utf-8').catch(() => null);
  const linea = contenido?.split(/\r?\n/).find((l) => l.trimStart().startsWith('DATABASE_URL='));
  if (!linea) throw new Error(`No hay DATABASE_URL en el entorno ni en ${rutaEnvBackend}.`);
  return linea.slice(linea.indexOf('=') + 1).trim().replace(/^["']|["']$/g, '');
}

const norm = (s) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().trim();

async function actualizarNeon(videos) {
  const pool = new Pool({ connectionString: await obtenerConnectionString() });
  let cambiadas = 0;
  try {
    for (const v of videos) {
      const { rows } = await pool.query('SELECT nombre FROM recetas WHERE id = $1', [v.recetaId]);
      if (!rows[0] || norm(rows[0].nombre) !== norm(v.nombre)) {
        console.warn(`  ⚠ id ${v.recetaId} no es "${v.nombre}" en Neon (es "${rows[0]?.nombre ?? '—'}"), se salta`);
        continue;
      }
      if (!DRY) await pool.query('UPDATE recetas SET video_url = $1 WHERE id = $2', [v.videoUrl, v.recetaId]);
      cambiadas++;
    }
  } finally {
    await pool.end();
  }
  console.log(`Neon: ${cambiadas} recetas ${DRY ? 'por actualizar' : 'actualizadas'}`);
}

// En el seed cada receta es un objeto con categoria_slug, nombre, ... y
// video_url. Se reemplaza el video_url del objeto cuyo slug + nombre coinciden.
async function actualizarSeed(videos) {
  const porClave = new Map(videos.map((v) => [`${v.categoria}|${norm(v.nombre)}`, v.videoUrl]));
  let cambiadas = 0;

  for (const categoria of await readdir(dirSeed, { withFileTypes: true })) {
    if (!categoria.isDirectory()) continue;
    const dir = path.join(dirSeed, categoria.name);
    for (const archivo of (await readdir(dir)).filter((f) => f.endsWith('.js'))) {
      const ruta = path.join(dir, archivo);
      const texto = await readFile(ruta, 'utf-8');
      const nuevo = texto.replace(
        // Algunas partes usan comillas dobles y otras simples para el nombre.
        /(categoria_slug: '([^']+)',\s*\n\s*nombre: (["'])((?:(?!\3).)+)\3,[\s\S]*?video_url: )(null|"[^"]*"|'[^']*')/g,
        (todo, inicio, slug, _comilla, nombre, actual) => {
          const clave = `${slug}|${norm(nombre)}`;
          if (!porClave.has(clave)) return todo;
          const url = porClave.get(clave);
          const valor = url ? JSON.stringify(url) : 'null';
          if (valor !== actual) cambiadas++;
          return inicio + valor;
        },
      );
      if (nuevo !== texto && !DRY) await writeFile(ruta, nuevo);
    }
  }
  console.log(`Seed: ${cambiadas} recetas ${DRY ? 'por actualizar' : 'actualizadas'}`);
}

const videos = JSON.parse(await readFile(path.join(import.meta.dirname, 'videos.json'), 'utf-8'));
console.log(`${videos.length} recetas en videos.json, ${videos.filter((v) => v.videoUrl).length} con video`);
await actualizarSeed(videos);
if (!SOLO_SEED) await actualizarNeon(videos);
