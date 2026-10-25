import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { AppColors } from './appColors';

const ThemeContext = createContext(null);

// Preferencia elegida con el botón de tema: 'claro' | 'oscuro'. Si el usuario
// nunca lo tocó, la app arranca en claro (el tema por defecto de Huebito),
// sin importar el modo del sistema.
export const CLAVE_TEMA = 'huebito_tema';

function leerPreferencia() {
  try {
    const valor = localStorage.getItem(CLAVE_TEMA);
    return valor === 'claro' || valor === 'oscuro' ? valor : null;
  } catch {
    return null;
  }
}

export function ThemeProvider({ children }) {
  const [preferencia, setPreferencia] = useState(leerPreferencia);
  const isDark = preferencia === 'oscuro';

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
