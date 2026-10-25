import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { ThemeProvider } from '../../../core/theme/ThemeProvider';

vi.mock('../../auth/presentation/providers/useAuth', () => ({ useAuth: () => ({ autenticado: true }) }));
vi.mock('../data/chatRemoteDatasource', () => ({ preguntarAlAsistente: vi.fn() }));
import { preguntarAlAsistente } from '../data/chatRemoteDatasource';
import { AsistenteFlotante } from './AsistenteFlotante';

function montar(ruta = '/home') {
  return render(
    <ThemeProvider>
      <MemoryRouter initialEntries={[ruta]}>
        <AsistenteFlotante />
      </MemoryRouter>
    </ThemeProvider>,
  );
}

describe('AsistenteFlotante', () => {
  beforeEach(() => {
    sessionStorage.clear();
    preguntarAlAsistente.mockReset();
  });

  it.each(['/home', '/almuerzo', '/favorites', '/history'])('aparece en %s', (ruta) => {
    montar(ruta);
    expect(screen.getByRole('button', { name: 'Abrir el asistente de Huebito' })).toBeInTheDocument();
  });

  it.each(['/roulette/cenas', '/recipe/5', '/login'])('no tapa los botones de %s', (ruta) => {
    montar(ruta);
    expect(screen.queryByRole('button', { name: 'Abrir el asistente de Huebito' })).toBeNull();
  });

  it('una sugerencia envía la pregunta y muestra la respuesta', async () => {
    preguntarAlAsistente.mockResolvedValue('Toca "Girar" y la ruleta elige por ti.');
    montar();
    await userEvent.click(screen.getByRole('button', { name: 'Abrir el asistente de Huebito' }));
    await userEvent.click(screen.getByRole('button', { name: '¿Cómo funciona la ruleta?' }));

    expect(await screen.findByText('Toca "Girar" y la ruleta elige por ti.')).toBeInTheDocument();
    // La bienvenida es local: a la API solo va la pregunta del usuario.
    expect(preguntarAlAsistente).toHaveBeenCalledWith([{ rol: 'user', texto: '¿Cómo funciona la ruleta?' }]);
  });

  it('escribir y presionar Enter también envía', async () => {
    preguntarAlAsistente.mockResolvedValue('Prueba el lomo saltado.');
    montar();
    await userEvent.click(screen.getByRole('button', { name: 'Abrir el asistente de Huebito' }));
    await userEvent.type(screen.getByLabelText('Tu pregunta para Huebi'), 'qué almuerzo{Enter}');
    expect(await screen.findByText('Prueba el lomo saltado.')).toBeInTheDocument();
  });

  it('si el servicio no está disponible lo explica sin romper', async () => {
    preguntarAlAsistente.mockRejectedValue(Object.assign(new Error('x'), { status: 503 }));
    montar();
    await userEvent.click(screen.getByRole('button', { name: 'Abrir el asistente de Huebito' }));
    await userEvent.type(screen.getByLabelText('Tu pregunta para Huebi'), 'hola{Enter}');
    expect(await screen.findByText(/no está disponible por ahora/)).toBeInTheDocument();
  });

  it('se cierra con el botón y la conversación se conserva al volver a abrir', async () => {
    preguntarAlAsistente.mockResolvedValue('¡Claro!');
    montar();
    await userEvent.click(screen.getByRole('button', { name: 'Abrir el asistente de Huebito' }));
    await userEvent.type(screen.getByLabelText('Tu pregunta para Huebi'), 'hola{Enter}');
    await screen.findByText('¡Claro!');
    await userEvent.click(screen.getByRole('button', { name: 'Cerrar el asistente' }));
    expect(screen.queryByRole('dialog')).toBeNull();

    await userEvent.click(screen.getByRole('button', { name: 'Abrir el asistente de Huebito' }));
    await waitFor(() => expect(screen.getByText('¡Claro!')).toBeInTheDocument());
  });
});
