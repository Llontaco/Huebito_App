import { describe, it, expect, vi, beforeEach } from 'vitest';
import { AuthRepositoryImpl } from './authRepositoryImpl';

function crearDatasource() {
  return {
    loginConGoogle: vi.fn().mockResolvedValue({
      accessToken: 'acc-1',
      usuario: { id: 1, nombre: 'Ana Pérez', email: 'ana@gmail.com', fotoUrl: 'f.jpg' },
    }),
    refrescar: vi.fn().mockResolvedValue({ accessToken: 'acc-2' }),
    obtenerPerfil: vi.fn().mockResolvedValue({ id: 1, nombre: 'Ana Pérez', email: 'ana@gmail.com', fotoUrl: null }),
    cerrarSesion: vi.fn().mockResolvedValue(null),
  };
}

describe('AuthRepositoryImpl', () => {
  let ds;
  let repo;
  beforeEach(() => {
    ds = crearDatasource();
    repo = new AuthRepositoryImpl(ds);
  });

  it('login con Google guarda el access token y adapta el usuario', async () => {
    const u = await repo.loginConGoogle('id-token');
    expect(ds.loginConGoogle).toHaveBeenCalledWith('id-token');
    expect(u).toEqual({ id: 1, nombre: 'Ana Pérez', correo: 'ana@gmail.com', fotoUrl: 'f.jpg' });
    expect(repo.obtenerAccessToken()).toBe('acc-1');
  });

  it('al abrir la app recupera la sesión con la cookie de refresh', async () => {
    const u = await repo.obtenerUsuarioActual();
    expect(ds.obtenerPerfil).toHaveBeenCalledWith('acc-2');
    expect(u.correo).toBe('ana@gmail.com');
  });

  it('sin sesión guardada devuelve null y no lanza', async () => {
    ds.refrescar.mockRejectedValue(Object.assign(new Error('401'), { status: 401 }));
    await expect(repo.obtenerUsuarioActual()).resolves.toBeNull();
    expect(repo.obtenerAccessToken()).toBeNull();
  });

  it('si se pide la sesión dos veces a la vez, hace un solo refresh', async () => {
    // React en modo estricto monta los efectos dos veces: dos refresh con el
    // mismo token harían que el backend lo tome como reuso.
    const [a, b] = await Promise.all([repo.obtenerUsuarioActual(), repo.obtenerUsuarioActual()]);
    expect(ds.refrescar).toHaveBeenCalledTimes(1);
    expect(a).toEqual(b);
  });

  it('una vez resuelta, una nueva consulta sí vuelve a preguntar', async () => {
    await repo.obtenerUsuarioActual();
    await repo.obtenerUsuarioActual();
    expect(ds.refrescar).toHaveBeenCalledTimes(2);
  });

  it('cerrar sesión borra el token aunque el backend falle', async () => {
    await repo.loginConGoogle('id-token');
    ds.cerrarSesion.mockRejectedValue(new Error('sin red'));
    await expect(repo.cerrarSesion()).resolves.toBeUndefined();
    expect(repo.obtenerAccessToken()).toBeNull();
  });
});
