import React from 'react';
import { useTheme } from '../theme/ThemeProvider';
import { Dificultad } from '../../features/recipes/domain/entities/dificultad';

export function DificultadBadge({ dificultad }) {
  const { colors } = useTheme();
  const nivel = dificultad === Dificultad.facil ? 1 : dificultad === Dificultad.media ? 2 : 3;

  return (
    <div className="flex items-center gap-1">
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className="w-[5px] rounded-full"
          style={{
            height: 6 + i * 3,
            backgroundColor: i < nivel ? colors.primary : colors.outline,
          }}
        />
      ))}
      {/* dificultad es el valor guardado ("facil"); la etiqueta visible sale de Dificultad. */}
      <span className="text-[13px] font-body ml-1.5 text-on-surface-variant">
        {Dificultad.getLabel(dificultad)}
      </span>
    </div>
  );
}
