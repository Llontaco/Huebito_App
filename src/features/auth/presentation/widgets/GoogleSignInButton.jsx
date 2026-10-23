import React, { useEffect, useRef, useState } from 'react';

const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;
const GSI_SRC = 'https://accounts.google.com/gsi/client';

// Carga el script de Google Identity Services una sola vez para toda la app.
let cargaGsi = null;
function cargarGsi() {
  if (window.google?.accounts?.id) return Promise.resolve();
  if (!cargaGsi) {
    cargaGsi = new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = GSI_SRC;
      script.async = true;
      script.onload = resolve;
      script.onerror = () => {
        cargaGsi = null;
        reject(new Error('No se pudo cargar el inicio de sesión de Google'));
      };
      document.head.appendChild(script);
    });
  }
  return cargaGsi;
}

// Botón oficial de Google. Al elegir una cuenta, Google devuelve un id_token
// (credential) que se manda tal cual al backend para que lo verifique.
export function GoogleSignInButton({ onCredential, onError, texto = 'continue_with' }) {
  const contenedor = useRef(null);
  const [fallo, setFallo] = useState(null);

  // Guardamos los callbacks en refs para no re-renderizar el botón de Google
  // cada vez que el padre cree funciones nuevas.
  const alCredencial = useRef(onCredential);
  const alError = useRef(onError);
  alCredencial.current = onCredential;
  alError.current = onError;

  useEffect(() => {
    if (!GOOGLE_CLIENT_ID) {
      setFallo('Falta VITE_GOOGLE_CLIENT_ID en el .env');
      return;
    }
    let cancelado = false;

    cargarGsi()
      .then(() => {
        if (cancelado || !contenedor.current) return;
        window.google.accounts.id.initialize({
          client_id: GOOGLE_CLIENT_ID,
          callback: ({ credential }) => alCredencial.current?.(credential),
          ux_mode: 'popup',
        });
        window.google.accounts.id.renderButton(contenedor.current, {
          type: 'standard',
          theme: 'outline',
          size: 'large',
          shape: 'pill',
          text: texto,
          logo_alignment: 'left',
          width: contenedor.current.offsetWidth || 300,
          locale: 'es',
        });
      })
      .catch((e) => {
        if (cancelado) return;
        setFallo(e.message);
        alError.current?.(e);
      });

    return () => { cancelado = true; };
  }, [texto]);

  if (fallo) {
    return <p className="text-xs font-body text-red-600">{fallo}</p>;
  }

  return <div ref={contenedor} className="w-full flex justify-center min-h-[44px]" />;
}
