import React from 'react';
import { useTheme } from '../theme/ThemeProvider';

// `label` nombra la acción para lectores de pantalla y aparece como tooltip:
// un botón que solo tiene ícono no tiene texto que leer.
export function AppIconButton({ icon: Icon, onPressed, filled = false, color, label }) {
  const { colors } = useTheme();
  return (
    <button
      onClick={onPressed}
      aria-label={label}
      title={label}
      className="flex items-center justify-center w-10 h-10 rounded-full transition-colors"
      style={{
        backgroundColor: filled ? colors.surfaceContainer : 'transparent',
        color: color || colors.onSurface,
      }}
    >
      <Icon size={22} strokeWidth={2} aria-hidden="true" />
    </button>
  );
}
