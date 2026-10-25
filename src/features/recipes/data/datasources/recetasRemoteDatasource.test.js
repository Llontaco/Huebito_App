import { describe, it, expect, vi } from 'vitest';

vi.mock('../../../../core/network/httpClient.js', () => ({ apiGet: vi.fn() }));
import { apiGet } from '../../../../core/network/httpClient.js';
import { RecetasRemoteDatasource } from './recetasRemoteDatasource';

describe('RecetasRemoteDatasource', () => {
  it('pide las páginas restantes en paralelo, no una detrás de otra', async () => {
    let enVuelo = 0;
    let maxEnVuelo = 0;
    apiGet.mockImplementation(async (_ruta, { params }) => {
      enVuelo++;
      maxEnVuelo = Math.max(maxEnVuelo, enVuelo);
      await new Promise((r) => setTimeout(r, 10));
      enVuelo--;
      const items = Array.from({ length: params.page < 3 ? 100 : 50 }, (_, i) => ({ id: params.page * 1000 + i }));
      return { items, total: 250, page: params.page };
    });

    const filas = await new RecetasRemoteDatasource().getRecetasByCategoria(2);
    expect(filas).toHaveLength(250);
    expect(apiGet).toHaveBeenCalledTimes(3);
    expect(maxEnVuelo).toBe(2); // páginas 2 y 3 a la vez
  });

  it('con una sola página hace un solo pedido', async () => {
    apiGet.mockReset();
    apiGet.mockResolvedValue({ items: [{ id: 1 }], total: 1 });
    await new RecetasRemoteDatasource().getRecetasByCategoria(5, { momento: 'cena' });
    expect(apiGet).toHaveBeenCalledTimes(1);
    expect(apiGet.mock.calls[0][1].params).toMatchObject({ categoriaId: 5, momento: 'cena', page: 1 });
  });
});
