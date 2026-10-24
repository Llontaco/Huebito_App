import { describe, it, expect } from 'vitest';
import { slugImagen } from './slugImagen';

describe('slugImagen', () => {
  it.each([
    ['Pan con palta', 'pan-con-palta'],
    ['Ají de Gallina', 'aji-de-gallina'],
    ['Champús', 'champus'],
    ['Piña colada', 'pina-colada'],
    ['Sánguche de pollo a la brasa', 'sanguche-de-pollo-a-la-brasa'],
    ['  Café  bombón!! ', 'cafe-bombon'],
    ['Tallarín a la Huancaína con Lomo', 'tallarin-a-la-huancaina-con-lomo'],
    ['Jugo de níspero', 'jugo-de-nispero'],
  ])('%s → %s', (nombre, slug) => {
    expect(slugImagen(nombre)).toBe(slug);
  });

  it('tolera valores vacíos', () => {
    expect(slugImagen(null)).toBe('');
    expect(slugImagen(undefined)).toBe('');
  });
});
