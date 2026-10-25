import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { useLocation } from 'react-router-dom';
import { MessageCircle, X, ArrowUp } from 'lucide-react';
import { useTheme } from '../../../core/theme/ThemeProvider';
import { AppRoutes } from '../../../core/router/appRoutes';
import { useAuth } from '../../auth/presentation/providers/useAuth';
import { preguntarAlAsistente } from '../data/chatRemoteDatasource';

// El botón solo aparece donde no tapa nada: en la ruleta y en el detalle de
// receta la parte de abajo es de los botones "Girar" y "Guardar favorito".
const RUTAS_CON_ASISTENTE = [AppRoutes.home, AppRoutes.almuerzo, AppRoutes.favorites, AppRoutes.history];

const CLAVE_CONVERSACION = 'huebito_chat';
const SUGERENCIAS = [
  '¿Cómo funciona la ruleta?',
  'Recomiéndame un almuerzo rápido',
  '¿Qué preparo con pollo y papa?',
  'Tengo una sugerencia para la app',
];
const BIENVENIDA = {
  rol: 'assistant',
  texto: '¡Hola! Soy Huebi 🥚. Te ayudo a usar Huebito, te doy consejos de cocina o te recomiendo qué preparar. ¿En qué te ayudo?',
};

function leerConversacion() {
  try {
    const guardada = JSON.parse(sessionStorage.getItem(CLAVE_CONVERSACION) || 'null');
    return Array.isArray(guardada) && guardada.length ? guardada : [BIENVENIDA];
  } catch {
    return [BIENVENIDA];
  }
}

function mensajeDeError(error) {
  if (error?.status === 429) return 'Estoy recibiendo muchas preguntas. Intenta de nuevo en un momento.';
  if (error?.status === 503) return 'El asistente no está disponible por ahora. Vuelve a intentarlo más tarde.';
  if (!navigator.onLine) return 'Necesitas conexión a internet para hablar conmigo.';
  return 'No pude responder. Revisa tu conexión e inténtalo otra vez.';
}

export function AsistenteFlotante() {
  const { pathname } = useLocation();
  const { autenticado } = useAuth();
  const [abierto, setAbierto] = useState(false);

  if (!autenticado || !RUTAS_CON_ASISTENTE.includes(pathname)) return null;

  return (
    <>
      {!abierto && <BotonAsistente onPressed={() => setAbierto(true)} />}
      {abierto && <PanelAsistente onClose={() => setAbierto(false)} />}
    </>
  );
}

function BotonAsistente({ onPressed }) {
  const { colors } = useTheme();
  return (
    <button
      onClick={onPressed}
      aria-label="Abrir el asistente de Huebito"
      title="Pregúntale a Huebi"
      className="fixed z-40 right-5 w-14 h-14 rounded-full flex items-center justify-center transition-transform active:scale-95"
      style={{
        bottom: 'calc(20px + env(safe-area-inset-bottom, 0px))',
        backgroundColor: colors.primary,
        color: colors.onPrimary,
      }}
    >
      <MessageCircle size={26} strokeWidth={2.2} aria-hidden="true" />
    </button>
  );
}

function PanelAsistente({ onClose }) {
  const { colors } = useTheme();
  const [mensajes, setMensajes] = useState(leerConversacion);
  const [texto, setTexto] = useState('');
  const [enviando, setEnviando] = useState(false);
  const finRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    try {
      sessionStorage.setItem(CLAVE_CONVERSACION, JSON.stringify(mensajes));
    } catch {
      // sin almacenamiento: la conversación dura mientras el panel esté abierto
    }
    finRef.current?.scrollIntoView?.({ block: 'end' });
  }, [mensajes, enviando]);

  useEffect(() => {
    const alTeclear = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', alTeclear);
    return () => window.removeEventListener('keydown', alTeclear);
  }, [onClose]);

  const enviar = async (contenido) => {
    const pregunta = contenido.trim().slice(0, 1500);
    if (!pregunta || enviando) return;
    const conPregunta = [...mensajes, { rol: 'user', texto: pregunta }];
    setMensajes(conPregunta);
    setTexto('');
    setEnviando(true);
    try {
      // La bienvenida es local: no se manda a la API.
      const respuesta = await preguntarAlAsistente(conPregunta.filter((m) => m !== BIENVENIDA && !m.error));
      setMensajes((actuales) => [...actuales, { rol: 'assistant', texto: respuesta }]);
    } catch (error) {
      setMensajes((actuales) => [...actuales, { rol: 'assistant', texto: mensajeDeError(error), error: true }]);
    } finally {
      setEnviando(false);
      inputRef.current?.focus();
    }
  };

  const soloBienvenida = mensajes.length === 1;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-end justify-center" role="dialog" aria-modal="true" aria-label="Asistente de Huebito">
      <div className="absolute inset-0" style={{ backgroundColor: colors.scrim }} onClick={onClose} />

      <div
        className="relative w-full max-w-lg flex flex-col rounded-t-card overflow-hidden"
        style={{ backgroundColor: colors.surface, height: 'min(82dvh, 680px)' }}
      >
        {/* Encabezado */}
        <div className="flex items-center gap-3 px-5 pt-4 pb-3" style={{ backgroundColor: colors.surface }}>
          <span
            className="w-10 h-10 rounded-full flex items-center justify-center text-[20px] flex-shrink-0"
            style={{ backgroundColor: colors.primary }}
          >
            🥚
          </span>
          <div className="flex-1 min-w-0">
            <p className="text-[17px] font-semibold font-body text-on-surface" style={{ letterSpacing: '-0.02em' }}>Huebi</p>
            <p className="text-[13px] font-body text-on-surface-variant">Asistente de Huebito</p>
          </div>
          <button
            onClick={onClose}
            aria-label="Cerrar el asistente"
            className="w-9 h-9 rounded-full flex items-center justify-center"
            style={{ backgroundColor: colors.fill, color: colors.onSurfaceVariant }}
          >
            <X size={18} strokeWidth={2.4} aria-hidden="true" />
          </button>
        </div>

        {/* Conversación */}
        <div className="flex-1 overflow-y-auto px-4 pb-3 flex flex-col gap-2" aria-live="polite">
          {mensajes.map((m, i) => (
            <Burbuja key={i} mensaje={m} />
          ))}

          {enviando && (
            <div className="self-start px-4 py-3 rounded-[20px] flex gap-1" style={{ backgroundColor: colors.surfaceContainer }} aria-label="Huebi está escribiendo">
              {[0, 1, 2].map((d) => (
                <span
                  key={d}
                  className="w-2 h-2 rounded-full animate-bounce"
                  style={{ backgroundColor: colors.onSurfaceVariant, animationDelay: `${d * 0.15}s` }}
                />
              ))}
            </div>
          )}

          {soloBienvenida && !enviando && (
            <div className="mt-2 flex flex-wrap gap-2">
              {SUGERENCIAS.map((s) => (
                <button
                  key={s}
                  onClick={() => enviar(s)}
                  className="px-3.5 py-2 rounded-full text-[14px] font-body"
                  style={{ backgroundColor: colors.primaryTint, color: colors.primary }}
                >
                  {s}
                </button>
              ))}
            </div>
          )}
          <div ref={finRef} />
        </div>

        {/* Caja de texto */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            enviar(texto);
          }}
          className="flex items-end gap-2 px-4 pt-2"
          style={{ paddingBottom: 'calc(12px + env(safe-area-inset-bottom, 0px))' }}
        >
          <textarea
            ref={inputRef}
            value={texto}
            onChange={(e) => setTexto(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                enviar(texto);
              }
            }}
            rows={1}
            maxLength={1500}
            placeholder="Escribe tu pregunta…"
            aria-label="Tu pregunta para Huebi"
            className="flex-1 resize-none rounded-[22px] px-4 py-2.5 text-[16px] font-body outline-none max-h-28"
            style={{ backgroundColor: colors.surfaceContainer, color: colors.onSurface, userSelect: 'text' }}
          />
          <button
            type="submit"
            disabled={!texto.trim() || enviando}
            aria-label="Enviar"
            className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 transition-opacity"
            style={{ backgroundColor: colors.primary, color: colors.onPrimary, opacity: !texto.trim() || enviando ? 0.4 : 1 }}
          >
            <ArrowUp size={20} strokeWidth={2.6} aria-hidden="true" />
          </button>
        </form>
      </div>
    </div>,
    document.body,
  );
}

function Burbuja({ mensaje }) {
  const { colors } = useTheme();
  const propio = mensaje.rol === 'user';
  return (
    <p
      className={`max-w-[85%] px-4 py-2.5 rounded-[20px] text-[15px] leading-snug font-body whitespace-pre-wrap ${propio ? 'self-end' : 'self-start'}`}
      style={{
        backgroundColor: propio ? colors.primary : colors.surfaceContainer,
        color: propio ? colors.onPrimary : mensaje.error ? colors.onSurfaceVariant : colors.onSurface,
        userSelect: 'text',
      }}
    >
      {mensaje.texto}
    </p>
  );
}
