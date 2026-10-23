import { API_BASE_URL, API_TIMEOUT_MS } from './apiConfig.js';

// Error propio para distinguir "el backend no está disponible" (que dispara el
// fallback al seed local) de un error de programación, que sí debe salir a la luz.
export class ApiError extends Error {
  constructor(mensaje, { status = null, causa = null } = {}) {
    super(mensaje);
    this.name = 'ApiError';
    this.status = status;
    this.causa = causa;
  }
}

function construirUrl(ruta, params) {
  // API_BASE_URL puede ser relativa ('/api', el proxy de Vercel), así que se
  // resuelve contra el origen de la página.
  const url = new URL(`${API_BASE_URL}${ruta.startsWith('/') ? ruta : `/${ruta}`}`, window.location.origin);
  for (const [clave, valor] of Object.entries(params || {})) {
    if (valor === undefined || valor === null || valor === '') continue;
    url.searchParams.set(clave, String(valor));
  }
  return url.toString();
}

// Petición con JSON para los endpoints de sesión (/auth, /users). Manda
// credentials: 'include' para que viaje la cookie httpOnly del refresh token,
// y el access token, si lo hay, como Bearer.
export async function apiRequest(ruta, { method = 'GET', body, token } = {}) {
  const controlador = new AbortController();
  const timeout = setTimeout(() => controlador.abort(), API_TIMEOUT_MS);

  const headers = { Accept: 'application/json' };
  if (body !== undefined) headers['Content-Type'] = 'application/json';
  if (token) headers.Authorization = `Bearer ${token}`;

  try {
    const respuesta = await fetch(construirUrl(ruta), {
      method,
      headers,
      body: body !== undefined ? JSON.stringify(body) : undefined,
      credentials: 'include',
      signal: controlador.signal,
    });

    if (!respuesta.ok) {
      const detalle = await respuesta.json().catch(() => null);
      throw new ApiError(detalle?.message || `El backend respondió ${respuesta.status} en ${ruta}`, {
        status: respuesta.status,
      });
    }

    return respuesta.status === 204 ? null : await respuesta.json();
  } catch (error) {
    if (error instanceof ApiError) throw error;
    throw new ApiError(`No se pudo contactar al backend (${ruta})`, { causa: error });
  } finally {
    clearTimeout(timeout);
  }
}

// GET con timeout. AbortController corta la petición si el backend no responde
// dentro de API_TIMEOUT_MS, en vez de dejarla colgada indefinidamente.
export async function apiGet(ruta, { params, signal } = {}) {
  const controlador = new AbortController();
  const timeout = setTimeout(() => controlador.abort(), API_TIMEOUT_MS);

  // Si quien llama ya traía su propio signal (por ejemplo, un efecto de React
  // que se desmonta), lo encadenamos para poder cancelar por cualquiera de los dos.
  const alAbortar = () => controlador.abort();
  signal?.addEventListener('abort', alAbortar);

  try {
    const respuesta = await fetch(construirUrl(ruta, params), {
      method: 'GET',
      headers: { Accept: 'application/json' },
      signal: controlador.signal,
    });

    if (!respuesta.ok) {
      throw new ApiError(`El backend respondió ${respuesta.status} en ${ruta}`, {
        status: respuesta.status,
      });
    }

    return await respuesta.json();
  } catch (error) {
    if (error instanceof ApiError) throw error;
    // AbortError, fallo de DNS, CORS, backend apagado: todo cae acá.
    throw new ApiError(`No se pudo contactar al backend (${ruta})`, { causa: error });
  } finally {
    clearTimeout(timeout);
    signal?.removeEventListener('abort', alAbortar);
  }
}
