import { RecetasRepository } from '../../domain/repositories/recetasRepository.js';
import { RecetasLocalDatasource } from '../datasources/recetasLocalDatasource.js';
import { RecetasRemoteDatasource } from '../datasources/recetasRemoteDatasource.js';
import { CategoriaModel } from '../models/categoriaModel.js';
import { RecetaModel } from '../models/recetaModel.js';
import { CategoriaSlug } from '../../domain/entities/categoria.js';

// Estrategia: el backend (que lee de Neon) es la fuente de verdad. Si no
// responde —sin internet, API caída, CORS mal configurado— caemos al seed
// local en localStorage para que la app siga usable offline, que es como
// estaba diseñada originalmente.
//
// `ultimoOrigen` deja rastro de qué fuente sirvió la última lectura, para que
// la UI pueda avisar cuando está mostrando datos locales en vez de los de Neon.
export class RecetasRepositoryImpl extends RecetasRepository {
  constructor() {
    super();
    this._local = new RecetasLocalDatasource();
    this._remote = new RecetasRemoteDatasource();
    this._cacheRecetas = new Map(); // "slug" o "slug:momento" -> Receta[]
    this._cachePorId = new Map(); // id (string) -> Receta
    this._cacheCategorias = null;
    this.ultimoOrigen = null; // 'remoto' | 'local'
  }

  // Intenta el backend y, si falla, ejecuta el plan B local. Un error de
  // programación dentro del fallback sí se propaga: no lo tapamos.
  async _conFallback(fnRemota, fnLocal) {
    try {
      const resultado = await fnRemota();
      this.ultimoOrigen = 'remoto';
      return resultado;
    } catch (error) {
      console.warn('[recetas] backend no disponible, usando seed local:', error.message);
      this.ultimoOrigen = 'local';
      return fnLocal();
    }
  }

  async getCategorias() {
    if (this._cacheCategorias) return this._cacheCategorias;

    // Se descartan las categorías que esta versión de la app no conoce, en vez
    // de dejar que CategoriaModel lance: una categoría nueva en la base no debe
    // hacer que la app entera caiga al seed local.
    const conocidas = (filas) => filas.filter((f) => CategoriaSlug.esValido(f.slug)).map(CategoriaModel.fromJson);
    const categorias = await this._conFallback(
      async () => conocidas(await this._remote.getCategorias()),
      async () => conocidas(await this._local.getCategorias())
    );

    this._cacheCategorias = categorias;
    return categorias;
  }

  // Con `momento` devuelve solo las recetas de ese momento del día. El seed
  // local no trae momentos, así que sin backend se ofrecen todas las de la
  // categoría: mejor una ruleta más amplia que una vacía.
  async getByCategoria(categoria, { momento } = {}) {
    const claveCache = momento ? `${categoria}:${momento}` : categoria;
    if (this._cacheRecetas.has(claveCache)) return this._cacheRecetas.get(claveCache);

    const categorias = await this.getCategorias();
    const encontrada = categorias.find((c) => c.slug === categoria);
    if (!encontrada) return [];

    const recetas = await this._conFallback(
      async () => (await this._remote.getRecetasByCategoria(encontrada.id, { momento })).map(RecetaModel.fromJson),
      async () => (await this._local.getRecetasByCategoria(encontrada.id)).map(RecetaModel.fromJson)
    );

    this._cacheRecetas.set(claveCache, recetas);
    // Indexamos también por id: historial y favoritos piden receta por receta,
    // y casi siempre son recetas que ya vinieron en alguna de estas listas.
    for (const receta of recetas) this._cachePorId.set(String(receta.id), receta);
    return recetas;
  }

  async getById(id) {
    const cacheada = this._cachePorId.get(String(id));
    if (cacheada) return cacheada;

    const receta = await this._conFallback(
      async () => {
        const fila = await this._remote.getRecetaById(id);
        return fila ? RecetaModel.fromJson(fila) : null;
      },
      async () => {
        const fila = await this._local.getRecetaById(id);
        return fila ? RecetaModel.fromJson(fila) : null;
      }
    );

    if (receta) this._cachePorId.set(String(id), receta);
    return receta;
  }

  // El sorteo se hace en el cliente sobre la lista ya cargada: así la ruleta
  // puede dibujar los mismos datos que va a sortear, y no hace falta un
  // endpoint extra en el backend.
  async getAleatoria(categoria, { excluirId, momento } = {}) {
    const recetas = await this.getByCategoria(categoria, { momento });
    if (recetas.length === 0) return null;

    const candidatas = excluirId ? recetas.filter((r) => r.id !== excluirId) : recetas;
    const origen = candidatas.length > 0 ? candidatas : recetas;
    return origen[Math.floor(Math.random() * origen.length)];
  }

  // Descarta la caché para forzar una relectura del backend.
  invalidarCache() {
    this._cacheRecetas.clear();
    this._cachePorId.clear();
    this._cacheCategorias = null;
  }
}
