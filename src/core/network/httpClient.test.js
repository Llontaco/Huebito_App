import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { apiGet, apiRequest, ApiError } from './httpClient';

function respuesta(status, body) {
  return {
    ok: status >= 200 && status < 300,
    status,
    json: async () => {
      if (body === undefined) throw new Error('sin cuerpo');
      return body;
    },
  };
}

describe('httpClient', () => {
  let fetchMock;

  beforeEach(() => {
    fetchMock = vi.fn();
    vi.stubGlobal('fetch', fetchMock);
  });
  afterEach(() => vi.unstubAllGlobals());

  describe('apiGet', () => {
    it('arma la URL con los parámetros y omite los vacíos', async () => {
      fetchMock.mockResolvedValue(respuesta(200, { ok: 1 }));
      await apiGet('/recetas', { params: { categoriaId: 2, momento: undefined, q: '', page: 1 } });

      const url = new URL(fetchMock.mock.calls[0][0]);
      expect(url.pathname).toMatch(/\/recetas$/);
      expect(Object.fromEntries(url.searchParams)).toEqual({ categoriaId: '2', page: '1' });
    });

    it('lanza ApiError con el status si el backend responde error', async () => {
      fetchMock.mockResolvedValue(respuesta(404, {}));
      const err = await apiGet('/recetas/9').catch((e) => e);
      expect(err).toBeInstanceOf(ApiError);
      expect(err.status).toBe(404);
    });

    it('convierte un fallo de red en ApiError sin status', async () => {
      fetchMock.mockRejectedValue(new TypeError('Failed to fetch'));
      const err = await apiGet('/categorias').catch((e) => e);
      expect(err).toBeInstanceOf(ApiError);
      expect(err.status).toBeNull();
    });

    it('corta la petición si el backend no responde a tiempo', async () => {
      vi.useFakeTimers();
      fetchMock.mockImplementation(
        (_url, { signal }) =>
          new Promise((_, reject) => signal.addEventListener('abort', () => reject(new DOMException('abort', 'AbortError')))),
      );
      const promesa = apiGet('/lento').catch((e) => e);
      await vi.advanceTimersByTimeAsync(7000);
      const err = await promesa;
      vi.useRealTimers();
      expect(err).toBeInstanceOf(ApiError);
    });
  });

  describe('apiRequest', () => {
    it('manda JSON, la cookie (credentials) y el Bearer', async () => {
      fetchMock.mockResolvedValue(respuesta(200, { a: 1 }));
      await apiRequest('/auth/google', { method: 'POST', body: { idToken: 'x' }, token: 'tok' });

      const [, opciones] = fetchMock.mock.calls[0];
      expect(opciones.method).toBe('POST');
      expect(opciones.credentials).toBe('include');
      expect(opciones.headers['Content-Type']).toBe('application/json');
      expect(opciones.headers.Authorization).toBe('Bearer tok');
      expect(JSON.parse(opciones.body)).toEqual({ idToken: 'x' });
    });

    it('un 204 devuelve null', async () => {
      fetchMock.mockResolvedValue(respuesta(204));
      await expect(apiRequest('/auth/logout', { method: 'POST' })).resolves.toBeNull();
    });

    it('usa el mensaje del backend en el error', async () => {
      fetchMock.mockResolvedValue(respuesta(401, { message: 'Token de Google inválido' }));
      await expect(apiRequest('/auth/google', { method: 'POST', body: {} })).rejects.toMatchObject({
        status: 401,
        message: 'Token de Google inválido',
      });
    });
  });
});
