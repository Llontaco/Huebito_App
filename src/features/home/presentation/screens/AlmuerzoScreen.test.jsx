import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Routes, Route, useLocation } from 'react-router-dom';
import { ThemeProvider } from '../../../../core/theme/ThemeProvider';
import { AlmuerzoScreen } from './AlmuerzoScreen';

function Ubicacion() {
  return <p data-testid="ruta">{useLocation().pathname}</p>;
}

function montar() {
  render(
    <ThemeProvider>
      <MemoryRouter initialEntries={['/almuerzo']}>
        <Routes>
          <Route path="/almuerzo" element={<AlmuerzoScreen />} />
          <Route path="*" element={<Ubicacion />} />
        </Routes>
      </MemoryRouter>
    </ThemeProvider>,
  );
}

describe('AlmuerzoScreen', () => {
  it('ofrece almuerzo clásico, sopa o chupe, y entrada', () => {
    montar();
    expect(screen.getByText('Almuerzo clásico')).toBeInTheDocument();
    expect(screen.getByText('Sopa o chupe')).toBeInTheDocument();
    expect(screen.getByText('Entrada')).toBeInTheDocument();
  });

  it.each([
    ['Almuerzo clásico', '/roulette/almuerzos'],
    ['Sopa o chupe', '/roulette/sopas'],
    ['Entrada', '/roulette/entradas'],
  ])('"%s" abre la ruleta %s', async (opcion, ruta) => {
    montar();
    await userEvent.click(screen.getByText(opcion));
    expect(screen.getByTestId('ruta')).toHaveTextContent(ruta);
  });
});
