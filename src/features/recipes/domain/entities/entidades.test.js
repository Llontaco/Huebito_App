import { describe, it, expect } from 'vitest';
import { CategoriaSlug, Momento } from './categoria';
import { Dificultad } from './dificultad';
import { AppRoutes } from '../../../../core/router/appRoutes';

describe('CategoriaSlug', () => {
  it('las comidas son desayunos, almuerzos y cenas (las bebidas van aparte)', () => {
    expect(CategoriaSlug.comidas).toEqual(['desayunos', 'almuerzos', 'cenas']);
  });

  it('el almuerzo ofrece segundo, sopa o entrada', () => {
    expect(CategoriaSlug.delAlmuerzo).toEqual(['almuerzos', 'sopas', 'entradas']);
  });

  it('sopas y entradas también ofrecen bebida acompañante (son platos)', () => {
    expect(CategoriaSlug.platos).toEqual(expect.arrayContaining(['desayunos', 'almuerzos', 'cenas', 'sopas', 'entradas']));
    expect(CategoriaSlug.platos).not.toContain('bebidas');
  });

  it('valida slugs', () => {
    expect(CategoriaSlug.esValido('cenas')).toBe(true);
    expect(CategoriaSlug.esValido('postres')).toBe(false);
    expect(CategoriaSlug.esValido(undefined)).toBe(false);
  });

  it('cada categoría tiene etiqueta y pregunta para la ruleta', () => {
    for (const c of CategoriaSlug.values) {
      expect(CategoriaSlug.labels[c]).toBeTruthy();
      expect(CategoriaSlug.preguntas[c]).toMatch(/^¿.*\?$/);
    }
  });
});

describe('Momento', () => {
  it('cada comida tiene su momento y su pregunta de bebida', () => {
    for (const c of CategoriaSlug.platos) {
      const m = Momento.deCategoria[c];
      expect(Momento.esValido(m)).toBe(true);
      expect(Momento.preguntasBebida[m]).toMatch(/^¿Qué tomo con mi/);
    }
  });

  it('sopas y entradas son del almuerzo', () => {
    expect(Momento.deCategoria.sopas).toBe('almuerzo');
    expect(Momento.deCategoria.entradas).toBe('almuerzo');
  });

  it('las bebidas no tienen momento propio', () => {
    expect(Momento.deCategoria.bebidas).toBeUndefined();
  });
});

describe('Dificultad', () => {
  it('traduce a etiquetas en español', () => {
    expect(Dificultad.getLabel('facil')).toBe('Fácil');
    expect(Dificultad.getLabel('dificil')).toBe('Difícil');
    expect(Dificultad.getLabel('rara')).toBe('Media');
  });
});

describe('AppRoutes', () => {
  it('arma las rutas de la ruleta y del detalle', () => {
    expect(AppRoutes.roulette('cenas')).toBe('/roulette/cenas');
    expect(AppRoutes.roulette('bebidas', { momento: 'cena' })).toBe('/roulette/bebidas?momento=cena');
    expect(AppRoutes.rouletteResult('cenas')).toBe('/roulette/cenas/result');
    expect(AppRoutes.recipeDetail(12)).toBe('/recipe/12');
  });
});
