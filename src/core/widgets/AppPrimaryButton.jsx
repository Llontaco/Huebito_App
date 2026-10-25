import React from 'react';
import { useTheme } from '../theme/ThemeProvider';
import { Loader2 } from 'lucide-react';

export const AppButtonVariant = {
  // Acción principal: píldora naranja con texto blanco.
  filled: 'filled',
  // Acción secundaria: píldora con relleno naranja suave y texto naranja,
  // como los botones "tinted" de iOS. Sin borde, para que no parezca una caja suelta.
  outlined: 'outlined',
};

export function AppPrimaryButton({ label, onPressed, icon: Icon, variant = AppButtonVariant.filled, loading = false }) {
  const { colors } = useTheme();
  const isEnabled = onPressed && !loading;
  const relleno = variant === AppButtonVariant.filled;

  return (
    <button
      onClick={isEnabled ? onPressed : undefined}
      disabled={!isEnabled}
      className="w-full h-[50px] rounded-full font-body text-[17px] font-semibold flex items-center justify-center gap-2 transition-[opacity,transform] active:scale-[0.98] active:opacity-80"
      style={{
        backgroundColor: relleno ? colors.primary : colors.primaryTint,
        color: relleno ? colors.onPrimary : colors.primary,
        opacity: isEnabled ? 1 : 0.5,
        letterSpacing: '-0.02em',
      }}
    >
      {loading ? (
        <Loader2 size={20} className="animate-spin" />
      ) : (
        <>
          {Icon && <Icon size={19} strokeWidth={2.2} aria-hidden="true" />}
          {label}
        </>
      )}
    </button>
  );
}
