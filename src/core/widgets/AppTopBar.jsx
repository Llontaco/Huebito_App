import React from 'react';
import { useTheme } from '../theme/ThemeProvider';
import { AppIconButton } from './AppIconButton';
import { ChevronLeft } from 'lucide-react';

// Barra superior al estilo iOS: flecha de volver en naranja y título centrado
// en 17px semibold.
export function AppTopBar({ title, onBack, actions = [] }) {
  const { colors } = useTheme();
  return (
    <div className="h-14 flex items-center px-3">
      <div className="w-11">
        {onBack && <AppIconButton icon={ChevronLeft} onPressed={onBack} label="Volver" color={colors.primary} />}
      </div>
      <div className="flex-1 text-center min-w-0">
        {title && (
          <h1 className="text-[17px] font-semibold font-body truncate" style={{ color: colors.onSurface, letterSpacing: '-0.02em' }}>
            {title}
          </h1>
        )}
      </div>
      <div className="w-11 flex justify-end">
        {actions.length > 0 ? (
          <div className="flex gap-2">{actions}</div>
        ) : null}
      </div>
    </div>
  );
}
