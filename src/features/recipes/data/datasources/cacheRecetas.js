// Copia en el navegador de las últimas respuestas de la API (recetas y
// categorías). Permite mostrar una ruleta al instante, incluso al volver a
// abrir la app, mientras los datos se renuevan por detrás.
//
// Se guardan las filas tal como llegan de la API (no las entidades), con la
// hora en que se guardaron. Un fallo de almacenamiento (modo privado, cuota
// llena) nunca rompe la app: simplemente no hay caché.

const CLAVE = 'huebito_cache_api_v1';
// Pasado este tiempo la copia se sigue usando, pero se pide una nueva por detrás.
export const FRESCURA_MS = 10 * 60 * 1000;

function leerTodo() {
  try {
    return JSON.parse(localStorage.getItem(CLAVE) || '{}');
  } catch {
    return {};
  }
}

export function leerCache(clave) {
  const entrada = leerTodo()[clave];
  if (!entrada || !Array.isArray(entrada.filas)) return null;
  return { filas: entrada.filas, fresca: Date.now() - entrada.t < FRESCURA_MS };
}

export function guardarCache(clave, filas) {
  try {
    const todo = leerTodo();
    todo[clave] = { t: Date.now(), filas };
    localStorage.setItem(CLAVE, JSON.stringify(todo));
  } catch {
    // Sin espacio o sin almacenamiento: seguimos sin caché.
  }
}

export function borrarCache() {
  try {
    localStorage.removeItem(CLAVE);
  } catch {
    // nada que borrar
  }
}
