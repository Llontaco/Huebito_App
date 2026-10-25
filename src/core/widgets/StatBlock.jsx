import React from 'react';
import { useTheme } from '../theme/ThemeProvider';

// Datos rápidos de la receta (tiempo, dificultad) en una tarjeta plana, como
// las celdas de resumen de iOS.
export function StatBlock({ items }) {
  const { colors } = useTheme();
  return (
    <div className="flex py-4 rounded-card" style={{ backgroundColor: colors.surfaceContainer }}>
      {items.map((item, i) => (
        <React.Fragment key={item.label}>
          {i > 0 && <div className="w-px self-stretch" style={{ backgroundColor: colors.outline }} />}
          <div className="flex-1 text-center">
            <p className="text-[13px] font-body text-on-surface-variant">{item.label}</p>
            <p className="text-[17px] font-semibold font-body text-on-surface mt-0.5" style={{ letterSpacing: '-0.02em' }}>
              {item.value}
            </p>
          </div>
        </React.Fragment>
      ))}
    </div>
  );
}
