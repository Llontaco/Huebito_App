/** Saca el id de un video de YouTube (watch?v=, youtu.be, shorts, embed). */
export function youtubeId(url) {
  try {
    const u = new URL(url);
    const host = u.hostname.replace('www.', '');
    if (host === 'youtu.be') return u.pathname.slice(1) || null;
    if (host === 'youtube.com' || host === 'm.youtube.com') {
      const v = u.searchParams.get('v');
      if (v) return v;
      const [tipo, id] = u.pathname.split('/').filter(Boolean);
      if ((tipo === 'shorts' || tipo === 'embed') && id) return id;
    }
  } catch {
    // URL inválida: se trata como video no reconocido
  }
  return null;
}

/** Miniatura de YouTube (480x360) para la vista previa, o null si no es de YouTube. */
export function miniaturaYoutube(url) {
  const id = url ? youtubeId(url) : null;
  return id ? `https://i.ytimg.com/vi/${id}/hqdefault.jpg` : null;
}

/**
 * Convierte una URL de video "normal" (YouTube, youtu.be, Vimeo) en su
 * versión embebible para poder reproducirla dentro de un iframe.
 * Si no reconoce el formato, devuelve la URL tal cual (el iframe
 * intentará cargarla igual).
 */
export function toEmbedUrl(url) {
  const id = youtubeId(url);
  if (id) return `https://www.youtube.com/embed/${id}?autoplay=1&rel=0&playsinline=1`;
  try {
    const u = new URL(url);
    if (u.hostname.replace('www.', '') === 'vimeo.com') {
      const vid = u.pathname.split('/').filter(Boolean)[0];
      if (vid) return `https://player.vimeo.com/video/${vid}?autoplay=1`;
    }
  } catch {
    // se devuelve tal cual
  }
  return url;
}
