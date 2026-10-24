import { describe, it, expect, beforeEach } from 'vitest';
import { appDatabase } from './appDatabase';
import { DbTables } from './dbConstants';
import { recetasSeedData } from './seed/recetasSeedData';

const DB_KEY = 'huebito_db_v3';

describe('appDatabase (copia local de recetas)', () => {
  beforeEach(() => {
    localStorage.clear();
    appDatabase._data = null;
  });

  it('la primera vez carga el seed completo', () => {
    const recetas = appDatabase.getTable(DbTables.recetas);
    expect(recetas).toHaveLength(recetasSeedData.length);
    expect(recetas[0]).toHaveProperty('categoria_slug');
    expect(recetas[0]).toHaveProperty('video_url');
    expect(JSON.parse(localStorage.getItem(DB_KEY)).seedVersion).toBeTruthy();
  });

  it('incluye los videos del seed', () => {
    const conVideo = appDatabase.getTable(DbTables.recetas).filter((r) => r.video_url);
    expect(conVideo.length).toBeGreaterThan(300);
  });

  it('si la copia guardada es de un seed viejo, regenera las recetas y conserva favoritos', () => {
    const vieja = {
      [DbTables.usuarios]: [],
      [DbTables.categorias]: [{ id: 1, nombre: 'Desayunos', slug: 'desayunos' }, { id: 2, nombre: 'Almuerzos', slug: 'almuerzos' }, { id: 3, nombre: 'Bebidas', slug: 'bebidas' }],
      [DbTables.recetas]: [{ id: 1, categoria_slug: 'desayunos', imagen_asset: '/x.jpg', video_url: null, nombre: 'Vieja' }],
      [DbTables.favoritos]: [{ id: 1, receta_id: 1 }],
      [DbTables.historial]: [],
      seedVersion: 'otra-version',
    };
    localStorage.setItem(DB_KEY, JSON.stringify(vieja));

    const recetas = appDatabase.getTable(DbTables.recetas);
    expect(recetas).toHaveLength(recetasSeedData.length);
    expect(recetas.some((r) => r.video_url)).toBe(true);
    expect(appDatabase.getTable(DbTables.favoritos)).toEqual([{ id: 1, receta_id: 1 }]);
  });

  it('si la copia está al día, no la reescribe', () => {
    appDatabase.getTable(DbTables.recetas);
    const guardada = JSON.parse(localStorage.getItem(DB_KEY));
    guardada[DbTables.recetas][0].nombre = 'Editada a mano';
    localStorage.setItem(DB_KEY, JSON.stringify(guardada));
    appDatabase._data = null;

    expect(appDatabase.getTable(DbTables.recetas)[0].nombre).toBe('Editada a mano');
  });

  it('insert, update y delete persisten', () => {
    const id = appDatabase.insert(DbTables.historial, { receta_id: 3 });
    appDatabase.update(DbTables.historial, id, { receta_id: 4 });
    expect(appDatabase.query(DbTables.historial, (h) => h.id === id)[0].receta_id).toBe(4);
    appDatabase.delete(DbTables.historial, id);
    expect(appDatabase.getTable(DbTables.historial)).toHaveLength(0);
  });

  it('cada receta del seed tiene los campos mínimos para mostrarse', () => {
    for (const r of recetasSeedData) {
      expect(r.nombre, JSON.stringify(r).slice(0, 80)).toBeTruthy();
      expect(['desayunos', 'almuerzos', 'cenas', 'bebidas']).toContain(r.categoria_slug);
      expect(r.ingredientes.length, r.nombre).toBeGreaterThan(0);
      expect(r.preparacion.length, r.nombre).toBeGreaterThan(0);
      expect(r.tiempo_minutos, r.nombre).toBeGreaterThan(0);
      if (r.video_url) expect(r.video_url, r.nombre).toMatch(/^https:\/\/www\.youtube\.com\/watch\?v=[\w-]{11}$/);
    }
  });
});
