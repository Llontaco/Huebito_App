import React, { useCallback, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { useTheme } from '../theme/ThemeProvider';
import { Film, Play, ExternalLink, X, WifiOff } from 'lucide-react';
import { AppIconButton } from './AppIconButton';
import { abrirEnlaceExterno } from '../platform/plataforma';
import { useConexion } from '../platform/useConexion';

/** Saca el id de un video de YouTube (watch?v=, youtu.be, shorts, embed). */
function youtubeId(url) {
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

/**
 * Convierte una URL de video "normal" (YouTube, youtu.be, Vimeo) en su
 * versión embebible para poder reproducirla dentro de un iframe.
 * Si no reconoce el formato, devuelve la URL tal cual (el iframe
 * intentará cargarla igual).
 */
function toEmbedUrl(url) {
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

function VideoModal({ videoUrl, nombre, onClose }) {
  const { colors } = useTheme();

  // Cerrar con Escape y bloquear el scroll del fondo mientras está abierto.
  useEffect(() => {
    const alTeclear = (e) => e.key === 'Escape' && onClose();
    const overflowPrevio = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', alTeclear);
    return () => {
      document.body.style.overflow = overflowPrevio;
      window.removeEventListener('keydown', alTeclear);
    };
  }, [onClose]);

  // Portal a <body>: si algún contenedor de la pantalla tiene transform (las
  // animaciones de entrada), un position: fixed dentro de él se descoloca.
  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: 'rgba(0,0,0,0.75)' }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`Video de ${nombre}`}
    >
      <div
        className="w-full max-w-2xl rounded-[20px] overflow-hidden shadow-2xl"
        style={{ backgroundColor: colors.surface }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-4 py-3">
          <p className="text-sm font-semibold font-body text-on-surface truncate pr-2">
            {nombre}
          </p>
          <AppIconButton icon={X} onPressed={onClose} filled />
        </div>

        <div className="w-full aspect-video bg-black">
          <iframe
            src={toEmbedUrl(videoUrl)}
            title={`Video de ${nombre}`}
            className="w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>

        <button
          onClick={() => abrirEnlaceExterno(videoUrl)}
          className="w-full flex items-center justify-center gap-2 py-3 text-sm font-body font-medium"
          style={{ color: colors.primary }}
        >
          <ExternalLink size={16} />
          Abrir en YouTube
        </button>
      </div>
    </div>,
    document.body,
  );
}

// Tarjeta de estado para cuando no se puede mostrar la vista previa.
function AvisoVideo({ icono: Icono, titulo, detalle }) {
  const { colors } = useTheme();
  return (
    <div
      className="mt-3 flex items-center gap-4 p-4 rounded-[20px]"
      style={{ backgroundColor: colors.surfaceContainer }}
    >
      <div
        className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
        style={{ backgroundColor: colors.outline, opacity: 0.5 }}
      >
        <Icono size={22} color={colors.onPrimary} />
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-sm font-body text-on-surface">{titulo}</p>
        <p className="text-[12px] font-body text-on-surface-variant">{detalle}</p>
      </div>
    </div>
  );
}

export function RecetaVideoSection({ videoUrl, nombre }) {
  const { colors } = useTheme();
  const [modalAbierto, setModalAbierto] = useState(false);
  const [miniaturaRota, setMiniaturaRota] = useState(false);
  const conectado = useConexion();
  const cerrarModal = useCallback(() => setModalAbierto(false), []);

  const id = videoUrl ? youtubeId(videoUrl) : null;
  const miniatura = id && !miniaturaRota ? `https://i.ytimg.com/vi/${id}/hqdefault.jpg` : null;

  let contenido;
  if (!videoUrl) {
    contenido = (
      <AvisoVideo icono={Film} titulo="Video no disponible por el momento" detalle="Vuelve pronto para verlo aquí" />
    );
  } else if (!conectado) {
    contenido = (
      <AvisoVideo icono={WifiOff} titulo="Necesitas conexión para ver el video" detalle="Conéctate a internet e inténtalo de nuevo" />
    );
  } else {
    contenido = (
      <button
        onClick={() => setModalAbierto(true)}
        className="group mt-3 relative block w-full aspect-video rounded-[20px] overflow-hidden text-left"
        style={{ backgroundColor: colors.surfaceContainer }}
        aria-label={`Ver video de la preparación de ${nombre}`}
      >
        {miniatura ? (
          <img
            src={miniatura}
            alt=""
            onError={() => setMiniaturaRota(true)}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <Film size={40} style={{ color: colors.onSurfaceVariant }} />
          </div>
        )}

        {/* Degradado para que el texto se lea sobre cualquier miniatura */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

        <span
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full flex items-center justify-center shadow-lg transition-transform group-hover:scale-110"
          style={{ backgroundColor: colors.primary }}
        >
          <Play size={28} fill={colors.onPrimary} color={colors.onPrimary} className="ml-1" />
        </span>

        <span className="absolute left-4 right-4 bottom-3 text-white">
          <span className="block text-sm font-semibold font-body">Mira la preparación paso a paso</span>
          <span className="block text-[12px] font-body opacity-80">Toca para reproducir</span>
        </span>
      </button>
    );
  }

  return (
    <div className="mt-8">
      <h3 className="text-[18px] font-semibold font-body text-on-surface">Video de la receta</h3>
      {contenido}
      {modalAbierto && (
        <VideoModal videoUrl={videoUrl} nombre={nombre} onClose={cerrarModal} />
      )}
    </div>
  );
}
