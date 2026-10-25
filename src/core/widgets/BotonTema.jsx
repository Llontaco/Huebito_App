import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../theme/ThemeProvider';
import { AppIconButton } from './AppIconButton';

// Cambia entre el tema oscuro y el claro cálido. Muestra el ícono del tema al
// que se va a pasar: sol en oscuro, luna en claro.
export function BotonTema() {
  const { isDark, alternarTema } = useTheme();
  return (
    <AppIconButton
      icon={isDark ? Sun : Moon}
      onPressed={alternarTema}
      label={isDark ? 'Cambiar a tema claro' : 'Cambiar a tema oscuro'}
    />
  );
}
