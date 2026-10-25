import { DbTables } from '../../../../core/database/dbConstants.js';

// La copia local de recetas (unas 400 con ingredientes y pasos) solo hace falta
// sin conexión. Se carga con import() dinámico para que no viaje en el bundle
// principal: así la app abre más rápido y la copia se descarga solo si se usa.
let cargaDb = null;
const db = () => {
  cargaDb ??= import('../../../../core/database/appDatabase.js').then((m) => m.appDatabase);
  return cargaDb;
};

export class RecetasLocalDatasource {
  async getCategorias() {
    return (await db()).getTable(DbTables.categorias);
  }

  async getRecetasByCategoria(categoriaId) {
    return (await db()).query(DbTables.recetas, (r) => r.categoria_id === categoriaId);
  }

  async getRecetaById(id) {
    const table = (await db()).getTable(DbTables.recetas);
    // El id puede venir como string desde la URL (useParams) o como número
    // desde el resto de la app; comparamos como texto para que ambos calcen.
    return table.find((r) => String(r.id) === String(id)) || null;
  }

  async getAleatoria(categoriaId, { excluirId } = {}) {
    const recetas = await this.getRecetasByCategoria(categoriaId);
    const filtradas = excluirId ? recetas.filter((r) => r.id !== excluirId) : recetas;
    if (filtradas.length === 0) return recetas[0] || null;
    const idx = Math.floor(Math.random() * filtradas.length);
    return filtradas[idx];
  }
}
