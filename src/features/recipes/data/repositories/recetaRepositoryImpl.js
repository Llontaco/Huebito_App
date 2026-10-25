import { RecetasRepository } from '../../domain/repositories/recetasRepository.js';
import { RecetasLocalDatasource } from '../datasources/recetasLocalDatasource.js';
import { RecetasRemoteDatasource } from '../datasources/recetasRemoteDatasource.js';
import { leerCache, guardarCache, borrarCache } from '../datasources/cacheRecetas.js';
import { CategoriaModel } from '../models/categoriaModel.js';
import { RecetaModel } from '../models/recetaModel.js';
import { CategoriaSlug } from '../../domain/entities/categoria.js';

// Estrategia, de más rápida a más lenta:
//   1. Memoria: lo que ya se pidió en esta sesión se devuelve al instante.
//   2. Copia en el navegador (cacheRecetas): se muestra al instante y, si es
//      vieja, se renueva por detrás sin hacer esperar al usuario.
//   3. Backend (Neon): fuente de verdad.
//   4. Seed local: solo si el backend no responde y no hay copia guardada.
//
// `ultimoOrigen` deja rastro de qué fuente sirvió la última lectura.
export class RecetasRepositoryImpl extends RecetasRepository {
  constructor() {
    super();
    this._local = new RecetasLocalDatasource();
    this._remote = new RecetasRemoteDatasource();
    this._cacheRecetas = new Map(); // "slug" o "slug:momento" -> Receta[]
    this._cachePorId = new Map(); // id (string) -> Receta
    this._cacheCategorias = null;
    this._enCurso = new Map(); // clave -> Promise, para no repetir pedidos simultáneos
    this.ultimoOrigen = null; // 'memoria' | 'cache' | 'remoto' | 'local'
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

  // Si dos pantallas piden lo mismo a la vez, comparten la misma petición.
  _unaVez(clave, fn) {
    if (!this._enCurso.has(clave)) {
      this._enCurso.set(clave, fn().finally(() => this._enCurso.delete(clave)));
    }
    return this._enCurso.get(clave);
  }

  // Lee de la copia del navegador; si está vieja (o no hay), pide al backend.
  // Con copia: responde al instante y renueva por detrás.
  async _conCache(clave, pedirRemoto, alActualizar) {
    const guardado = leerCache(clave);
    if (guardado) {
      if (!guardado.fresca) {
        this._unaVez(`renovar:${clave}`, async () => {
          const filas = await pedirRemoto();
          guardarCache(clave, filas);
          alActualizar(filas);
        }).catch(() => {});
      }
      this.ultimoOrigen = 'cache';
      return { filas: guardado.filas };
    }
    const filas = await pedirRemoto();
    guardarCache(clave, filas);
    this.ultimoOrigen = 'remoto';
    return { filas };
  }

  async getCategorias() {
    if (this._cacheCategorias) return this._cacheCategorias;

    // Se descartan las categorías que esta versión de la app no conoce, en vez
    // de dejar que CategoriaModel lance: una categoría nueva en la base no debe
    // hacer que la app entera caiga al seed local.
    const conocidas = (filas) => filas.filter((f) => CategoriaSlug.esValido(f.slug)).map(CategoriaModel.fromJson);

    const categorias = await this._unaVez('categorias', async () => {
      try {
        const { filas } = await this._conCache('categorias', () => this._remote.getCategorias(), (nuevas) => {
          this._cacheCategorias = conocidas(nuevas);
        });
        return conocidas(filas);
      } catch (error) {
        console.warn('[recetas] backend no disponible, usando seed local:', error.message);
        this.ultimoOrigen = 'local';
        return conocidas(await this._local.getCategorias());
      }
    });

    // Si una renovación por detrás ya dejó datos más nuevos, no se pisan.
    this._cacheCategorias ??= categorias;
    return this._cacheCategorias;
  }

  _indexar(recetas) {
    for (const receta of recetas) this._cachePorId.set(String(receta.id), receta);
  }

  // Con `momento` devuelve solo las recetas de ese momento del día. El seed
  // local no trae momentos, así que sin backend se ofrecen todas las de la
  // categoría: mejor una ruleta más amplia que una vacía.
  async getByCategoria(categoria, { momento } = {}) {
    const claveCache = momento ? `${categoria}:${momento}` : categoria;
    if (this._cacheRecetas.has(claveCache)) {
      this.ultimoOrigen = 'memoria';
      return this._cacheRecetas.get(claveCache);
    }

    const recetas = await this._unaVez(`recetas:${claveCache}`, async () => {
      const categorias = await this.getCategorias();
      const encontrada = categorias.find((c) => c.slug === categoria);
      if (!encontrada) return [];

      const aModelos = (filas) => filas.map(RecetaModel.fromJson);
      try {
        const { filas } = await this._conCache(
          `recetas:${claveCache}`,
          () => this._remote.getRecetasByCategoria(encontrada.id, { momento }),
          (nuevas) => {
            const modelos = aModelos(nuevas);
            this._cacheRecetas.set(claveCache, modelos);
            this._indexar(modelos);
          },
        );
        return aModelos(filas);
      } catch (error) {
        console.warn('[recetas] backend no disponible, usando seed local:', error.message);
        this.ultimoOrigen = 'local';
        return aModelos(await this._local.getRecetasByCategoria(encontrada.id));
      }
    });

    // Si una renovación por detrás ya dejó una lista más nueva, no se pisa.
    if (!this._cacheRecetas.has(claveCache)) this._cacheRecetas.set(claveCache, recetas);
    const vigentes = this._cacheRecetas.get(claveCache);
    // Indexamos también por id: historial y favoritos piden receta por receta,
    // y casi siempre son recetas que ya vinieron en alguna de estas listas.
    this._indexar(vigentes);
    return vigentes;
  }

  // Lectura inmediata (sin esperar) de lo que ya está en memoria; null si no hay.
  peek(categoria, { momento } = {}) {
    return this._cacheRecetas.get(momento ? `${categoria}:${momento}` : categoria) ?? null;
  }

  // Pide en segundo plano todas las categorías de comida, para que al tocar
  // una ruleta los datos ya estén listos. No lanza nunca.
  precargar(slugs = [...CategoriaSlug.platos, CategoriaSlug.bebidas]) {
    return Promise.allSettled(slugs.map((slug) => this.getByCategoria(slug)));
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

  // Descarta la caché (memoria y navegador) para forzar una relectura del backend.
  invalidarCache() {
    this._cacheRecetas.clear();
    this._cachePorId.clear();
    this._cacheCategorias = null;
    borrarCache();
  }
}
