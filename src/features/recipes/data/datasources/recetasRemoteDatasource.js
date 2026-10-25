import { apiGet } from '../../../../core/network/httpClient.js';
import { API_MAX_LIMIT } from '../../../../core/network/apiConfig.js';

// Lee del backend NestJS, que a su vez consulta Neon. Devuelve las filas tal
// como llegan de la API; normalizarlas al formato que esperan las entidades es
// responsabilidad de RecetaModel/CategoriaModel, igual que con el datasource local.
export class RecetasRemoteDatasource {
  async getCategorias({ signal } = {}) {
    // GET /categorias -> [{ id, nombre, slug }]
    return apiGet('/categorias', { signal });
  }

  // GET /recetas -> { items, total, page, limit }
  // El DTO topea limit en 100. La primera página trae el total; si faltan
  // filas, las páginas restantes se piden todas a la vez (en paralelo), no una
  // detrás de otra, para no sumar la latencia de cada viaje.
  //
  // Con `momento`, la API devuelve solo las recetas de ese momento del día
  // (lo usa la ruleta de acompañante para las bebidas).
  async getRecetasByCategoria(categoriaId, { momento, signal } = {}) {
    const params = (page) => ({ categoriaId, ...(momento ? { momento } : {}), limit: API_MAX_LIMIT, page });

    const primera = await apiGet('/recetas', { params: params(1), signal });
    const items = [...(primera?.items ?? [])];
    const total = primera?.total ?? items.length;
    const paginas = Math.ceil(total / API_MAX_LIMIT);
    if (paginas <= 1 || items.length === 0) return items;

    const resto = await Promise.all(
      Array.from({ length: paginas - 1 }, (_, i) => apiGet('/recetas', { params: params(i + 2), signal })),
    );
    for (const r of resto) items.push(...(r?.items ?? []));
    return items;
  }

  async getRecetaById(id, { signal } = {}) {
    try {
      return await apiGet(`/recetas/${id}`, { signal });
    } catch (error) {
      // Una receta inexistente (404) no es una caída del backend: devolvemos
      // null para que el repositorio no dispare el fallback al seed local.
      if (error?.status === 404) return null;
      throw error;
    }
  }
}
