import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeProvider, CLAVE_TEMA } from '../theme/ThemeProvider';
import { BotonTema } from './BotonTema';

function montar() {
  return render(
    <ThemeProvider>
      <BotonTema />
    </ThemeProvider>,
  );
}

describe('BotonTema', () => {
  beforeEach(() => document.documentElement.classList.remove('dark'));

  it('sin preferencia guardada arranca en claro aunque el sistema esté en oscuro', () => {
    const original = window.matchMedia;
    window.matchMedia = (q) => ({ ...original(q), matches: true });
    montar();
    expect(document.documentElement.classList.contains('dark')).toBe(false);
    expect(screen.getByRole('button', { name: 'Cambiar a tema oscuro' })).toBeInTheDocument();
    window.matchMedia = original;
  });

  it('al tocarlo cambia de tema y guarda la elección', async () => {
    montar();
    await userEvent.click(screen.getByRole('button', { name: 'Cambiar a tema oscuro' }));
    expect(document.documentElement.classList.contains('dark')).toBe(true);
    expect(localStorage.getItem(CLAVE_TEMA)).toBe('oscuro');

    await userEvent.click(screen.getByRole('button', { name: 'Cambiar a tema claro' }));
    expect(document.documentElement.classList.contains('dark')).toBe(false);
    expect(localStorage.getItem(CLAVE_TEMA)).toBe('claro');
  });

  it('respeta la elección guardada al volver a abrir la app', () => {
    localStorage.setItem(CLAVE_TEMA, 'oscuro');
    montar();
    expect(document.documentElement.classList.contains('dark')).toBe(true);
    expect(screen.getByRole('button', { name: 'Cambiar a tema claro' })).toBeInTheDocument();
  });

  it('actualiza el color de la barra del navegador', async () => {
    const meta = document.createElement('meta');
    meta.name = 'theme-color';
    document.head.appendChild(meta);
    montar();
    await userEvent.click(screen.getByRole('button', { name: 'Cambiar a tema oscuro' }));
    expect(meta.getAttribute('content')).toBe('#000000');
    meta.remove();
  });
});
