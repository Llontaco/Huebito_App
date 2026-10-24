import { describe, it, expect, vi, beforeEach } from 'vitest';
import { RecetasRepositoryImpl } from './recetaRepositoryImpl';
import { ApiError } from '../../../../core/network/httpClient';

const categorias = [
  { id: 1, nombre: 'Desayunos', slug: 'desayunos' },
  { id: 3, nombre: 'Bebidas', slug: 'bebidas' },
];
const fila = (id, nombre, slug = 'desayunos') => ({ id, nombre, categoria: { slug }, ingredientes: [], preparacion: [] });

function crearRepo() {
  const repo = new RecetasRepositoryImpl();
  repo._remote = {
    getCategorias: vi.fn().mockResolvedValue(categorias),
    getRecetasByCategoria: vi.fn().mockResolvedValue([fila(10, 'Pan A'), fila(11, 'Pan B')]),
    getRecetaById: vi.fn().mockResolvedValue(fila(10, 'Pan A')),
  };
  repo._local = {
    getCategorias: vi.fn().mockResolvedValue(categorias),
    getRecetasByCategoria: vi.fn().mockResolvedValue([{ ...fila(1, 'Local'), categoria_slug: 'desayunos' }]),
    getRecetaById: vi.fn().mockResolvedValue({ ...fila(1, 'Local'), categoria_slug: 'desayunos' }),
  };
  return repo;
}

describe('RecetasRepositoryImpl', () => {
  let repo;
  beforeEach(() => {
    repo = crearRepo();
    vi.spyOn(console, 'warn').mockImplementation(() => {});
  });

  it('lee del backend cuando responde', async () => {
    const recetas = await repo.getByCategoria('desayunos');
    expect(recetas.map((r) => r.nombre)).toEqual(['Pan A', 'Pan B']);
    expect(repo.ultimoOrigen).toBe('remoto');
    expect(repo._remote.getRecetasByCategoria).toHaveBeenCalledWith(1, { momento: undefined });
  });

  it('si el backend no responde, usa el seed local', async () => {
    repo._remote.getRecetasByCategoria.mockRejectedValue(new ApiError('caído'));
    const recetas = await repo.getByCategoria('desayunos');
    expect(recetas.map((r) => r.nombre)).toEqual(['Local']);
    expect(repo.ultimoOrigen).toBe('local');
  });

  it('guarda en caché: la segunda lectura no vuelve a pedir', async () => {
    await repo.getByCategoria('desayunos');
    await repo.getByCategoria('desayunos');
    expect(repo._remote.getRecetasByCategoria).toHaveBeenCalledTimes(1);
  });

  it('la caché distingue el momento del día', async () => {
    await repo.getByCategoria('bebidas', { momento: 'cena' });
    await repo.getByCategoria('bebidas', { momento: 'desayuno' });
    expect(repo._remote.getRecetasByCategoria).toHaveBeenCalledTimes(2);
  });

  it('una categoría desconocida devuelve lista vacía', async () => {
    await expect(repo.getByCategoria('postres')).resolves.toEqual([]);
  });

  it('getById aprovecha lo que ya vino en un listado', async () => {
    await repo.getByCategoria('desayunos');
    const r = await repo.getById('11');
    expect(r.nombre).toBe('Pan B');
    expect(repo._remote.getRecetaById).not.toHaveBeenCalled();
  });

  it('getById de una receta inexistente devuelve null sin caer al seed', async () => {
    repo._remote.getRecetaById.mockResolvedValue(null);
    await expect(repo.getById(999)).resolves.toBeNull();
    expect(repo._local.getRecetaById).not.toHaveBeenCalled();
  });

  it('getAleatoria no repite la receta anterior si hay otras', async () => {
    for (let i = 0; i < 20; i++) {
      const r = await repo.getAleatoria('desayunos', { excluirId: 10 });
      expect(r.id).toBe(11);
    }
  });

  it('getAleatoria con una sola receta la devuelve igual', async () => {
    repo._remote.getRecetasByCategoria.mockResolvedValue([fila(10, 'Única')]);
    const r = await repo.getAleatoria('desayunos', { excluirId: 10 });
    expect(r.id).toBe(10);
  });

  it('invalidarCache fuerza una nueva lectura', async () => {
    await repo.getByCategoria('desayunos');
    repo.invalidarCache();
    await repo.getByCategoria('desayunos');
    expect(repo._remote.getRecetasByCategoria).toHaveBeenCalledTimes(2);
  });
});
