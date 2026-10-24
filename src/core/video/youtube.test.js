import { describe, it, expect } from 'vitest';
import { youtubeId, miniaturaYoutube, toEmbedUrl } from './youtube';

describe('youtubeId', () => {
  it.each([
    ['https://www.youtube.com/watch?v=S3k1yDksoO4', 'S3k1yDksoO4'],
    ['https://youtube.com/watch?v=S3k1yDksoO4&t=30s', 'S3k1yDksoO4'],
    ['https://m.youtube.com/watch?v=S3k1yDksoO4', 'S3k1yDksoO4'],
    ['https://youtu.be/S3k1yDksoO4', 'S3k1yDksoO4'],
    ['https://www.youtube.com/shorts/S3k1yDksoO4', 'S3k1yDksoO4'],
    ['https://www.youtube.com/embed/S3k1yDksoO4', 'S3k1yDksoO4'],
  ])('reconoce %s', (url, id) => {
    expect(youtubeId(url)).toBe(id);
  });

  it.each([null, undefined, '', 'no es una url', 'https://vimeo.com/123', 'https://www.youtube.com/', 'https://youtu.be/'])(
    'devuelve null para %s',
    (url) => {
      expect(youtubeId(url)).toBeNull();
    },
  );
});

describe('miniaturaYoutube', () => {
  it('arma la URL de la miniatura', () => {
    expect(miniaturaYoutube('https://youtu.be/abc123')).toBe('https://i.ytimg.com/vi/abc123/hqdefault.jpg');
  });

  it('no inventa miniaturas para videos que no son de YouTube', () => {
    expect(miniaturaYoutube('https://vimeo.com/1')).toBeNull();
    expect(miniaturaYoutube(null)).toBeNull();
  });
});

describe('toEmbedUrl', () => {
  it('YouTube se embebe con autoplay y sin videos sugeridos de otros canales', () => {
    expect(toEmbedUrl('https://www.youtube.com/watch?v=abc')).toBe(
      'https://www.youtube.com/embed/abc?autoplay=1&rel=0&playsinline=1',
    );
  });

  it('Vimeo usa su reproductor', () => {
    expect(toEmbedUrl('https://vimeo.com/76979871')).toBe('https://player.vimeo.com/video/76979871?autoplay=1');
  });

  it('una URL desconocida se deja tal cual', () => {
    expect(toEmbedUrl('https://ejemplo.com/video.mp4')).toBe('https://ejemplo.com/video.mp4');
    expect(toEmbedUrl('basura')).toBe('basura');
  });
});
