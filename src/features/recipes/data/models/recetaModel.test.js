import { describe, it, expect } from 'vitest';
import { RecetaModel } from './recetaModel';
import { Dificultad } from '../../domain/entities/dificultad';

const deApi = {
  id: 172,
  categoriaId: 2,
  nombre: 'Receta de prueba sin foto local',
  descripcion: 'Desc',
  ingredientes: ['1 kg de cerdo', '2 cebollas'],
  preparacion: ['Macerar', 'Cocinar'],
  tiempoMinutos: 90,
  dificultad: 'dificil',
  imagenAsset: '/assets/x.jpg',
  bebida: 'Chicha de jora',
  acompanamiento: 'Pan',
  videoUrl: 'https://www.youtube.com/watch?v=abc',
  momentos: [],
  imagenBytes: 40211,
  imagenAutor: 'Juan',
  imagenLicencia: 'CC BY 4.0',
  imagenFuente: 'https://commons.wikimedia.org/x',
  categoria: { id: 2, nombre: 'Almuerzos', slug: 'almuerzos' },
};

const deLocal = {
  id: 5,
  categoria_id: 1,
  categoria_slug: 'desayunos',
  nombre: 'Otra receta sin foto',
  descripcion: 'Desc',
  ingredientes: '4 panes|2 paltas',
  preparacion: 'Cortar|Untar',
  tiempo_minutos: 10,
  dificultad: 'facil',
  imagen_asset: '/assets/y.jpg',
  bebida: null,
  acompanamiento: null,
  video_url: null,
};

describe('RecetaModel.fromJson', () => {
  it('normaliza una receta que viene de la API', () => {
    const r = RecetaModel.fromJson(deApi);
    expect(r).toMatchObject({
      id: 172,
      categoriaSlug: 'almuerzos',
      ingredientes: ['1 kg de cerdo', '2 cebollas'],
      preparacion: ['Macerar', 'Cocinar'],
      tiempoMinutos: 90,
      dificultad: Dificultad.dificil,
      videoUrl: 'https://www.youtube.com/watch?v=abc',
      imagenAutor: 'Juan',
    });
  });

  it('normaliza una receta del seed local (listas con "|")', () => {
    const r = RecetaModel.fromJson(deLocal);
    expect(r.categoriaSlug).toBe('desayunos');
    expect(r.ingredientes).toEqual(['4 panes', '2 paltas']);
    expect(r.preparacion).toEqual(['Cortar', 'Untar']);
    expect(r.tiempoMinutos).toBe(10);
    expect(r.videoUrl).toBeNull();
  });

  it('si la receta tiene foto en la base, apunta al endpoint de la imagen', () => {
    expect(RecetaModel.fromJson(deApi).imagenUrl).toMatch(/\/recetas\/172\/imagen$/);
  });

  it('sin foto en la base ni en la carpeta, no pide archivos que no existen', () => {
    expect(RecetaModel.fromJson(deLocal).imagenUrl).toBeNull();
  });

  it('una foto subida a la carpeta image/ manda sobre la de la base', () => {
    // "Pan con palta" tiene foto propia en image/desayunos/.
    const r = RecetaModel.fromJson({ ...deApi, nombre: 'Pan con palta', categoria: { slug: 'desayunos' } });
    expect(r.imagenUrl).toMatch(/pan-con-palta/);
    // Foto propia: no arrastra el crédito de la foto de la base.
    expect(r.imagenAutor).toBeNull();
    expect(r.imagenLicencia).toBeNull();
  });

  it('una dificultad desconocida cae en "media"', () => {
    expect(RecetaModel.fromJson({ ...deLocal, dificultad: 'imposible' }).dificultad).toBe(Dificultad.media);
  });

  it('listas vacías o con huecos no rompen', () => {
    const r = RecetaModel.fromJson({ ...deLocal, ingredientes: null, preparacion: 'Paso 1||Paso 2|' });
    expect(r.ingredientes).toEqual([]);
    expect(r.preparacion).toEqual(['Paso 1', 'Paso 2']);
  });

  it('una categoría desconocida lanza error en vez de mostrar datos inconsistentes', () => {
    expect(() => RecetaModel.fromJson({ ...deLocal, categoria_slug: 'postres' })).toThrow(/Categoría desconocida/);
  });
});
