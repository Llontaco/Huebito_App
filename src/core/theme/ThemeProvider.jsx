import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { AppColors } from './appColors';

const ThemeContext = createContext(null);

// Preferencia elegida con el botón de tema: 'claro' | 'oscuro'. Si el usuario
// nunca lo tocó no hay nada guardado y la app sigue el modo del sistema.
export const CLAVE_TEMA = 'huebito_tema';

function leerPreferencia() {
  try {
    const valor = localStorage.getItem(CLAVE_TEMA);
    return valor === 'claro' || valor === 'oscuro' ? valor : null;
  } catch {
    return null;
  }
}

const sistemaOscuro = () =>
  typeof window !== 'undefined' && !!window.matchMedia?.('(prefers-color-scheme: dark)').matches;

export function ThemeProvider({ children }) {
  const [preferencia, setPreferencia] = useState(leerPreferencia);
  const [oscuroSistema, setOscuroSistema] = useState(sistemaOscuro);
  const isDark = preferencia ? preferencia === 'oscuro' : oscuroSistema;

  // Sin preferencia guardada, acompaña los cambios del modo del sistema.
  useEffect(() => {
    const mq = window.matchMedia?.('(prefers-color-scheme: dark)');
    if (!mq) return undefined;
    const alCambiar = (e) => setOscuroSistema(e.matches);
    mq.addEventListener?.('change', alCambiar);
    return () => mq.removeEventListener?.('change', alCambiar);
  }, []);

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.toggle('dark', isDark);
    root.style.colorScheme = isDark ? 'dark' : 'light';
    // Color de la barra del navegador en el celular.
    const fondo = isDark ? AppColors.dark.surface : AppColors.light.surface;
    document.querySelectorAll('meta[name="theme-color"]').forEach((m) => m.setAttribute('content', fondo));
  }, [isDark]);

  const setIsDark = useCallback((oscuro) => {
    const valor = oscuro ? 'oscuro' : 'claro';
    setPreferencia(valor);
    try {
      localStorage.setItem(CLAVE_TEMA, valor);
    } catch {
      // Sin almacenamiento (modo privado): el cambio dura hasta recargar.
    }
  }, []);

  const alternarTema = useCallback(() => setIsDark(!isDark), [isDark, setIsDark]);

  const colors = isDark ? AppColors.dark : AppColors.light;

  return (
    <ThemeContext.Provider value={{ colors, isDark, setIsDark, alternarTema }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be inside ThemeProvider');
  return ctx;
}
