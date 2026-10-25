import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AppRoutes } from '../../../../core/router/appRoutes';
import { AppPrimaryButton, AppButtonVariant } from '../../../../core/widgets/AppPrimaryButton';
import { useTheme } from '../../../../core/theme/ThemeProvider';
import { useAuth } from '../providers/useAuth';
import { GoogleSignInButton } from '../widgets/GoogleSignInButton';
import { BotonTema } from '../../../../core/widgets/BotonTema';

export function LoginScreen({ mode = 'login' }) {
  const navigate = useNavigate();
  const { colors } = useTheme();
  const { continuarComoInvitado, loginConGoogle, error, setError } = useAuth();
  const esLogin = mode === 'login';

  const handleGuestLogin = () => {
    continuarComoInvitado();
    navigate(AppRoutes.home, { replace: true });
  };

  const handleGoogle = async (idToken) => {
    try {
      await loginConGoogle(idToken);
      navigate(AppRoutes.home, { replace: true });
    } catch {
      // el mensaje ya quedó en `error`
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-5 py-10 relative overflow-hidden"
      style={{ backgroundColor: colors.surface }}
    >
      <div className="absolute top-4 right-4 pt-safe z-10">
        <BotonTema />
      </div>

      {/* Tarjeta plana al estilo iOS: se separa del fondo solo por el tono. */}
      <div
        className="relative w-full max-w-[360px] rounded-card px-7 py-10 flex flex-col items-center text-center"
        style={{ backgroundColor: colors.surfaceContainer }}
      >
        <div
          className="w-20 h-20 rounded-full flex items-center justify-center text-[36px] mb-5"
          style={{ backgroundColor: colors.primary }}
        >
          🥚
        </div>

        <h1
          className="text-[30px] font-bold font-display tracking-[-0.03em] leading-tight"
          style={{ color: colors.onSurface }}
        >
          {esLogin ? 'Bienvenido' : 'Crear cuenta'}
        </h1>
        <p
          className="mt-2 mb-8 text-sm font-body leading-relaxed"
          style={{ color: colors.onSurfaceVariant }}
        >
          {esLogin
            ? 'Ingresa y descubre qué cocinar hoy con Huebito.'
            : 'Únete a Huebito y empieza a descubrir nuevas recetas.'}
        </p>

        <div className="w-full">
          <GoogleSignInButton
            texto={esLogin ? 'signin_with' : 'signup_with'}
            onCredential={handleGoogle}
            onError={(e) => setError(e.message)}
          />
        </div>

        {error && (
          <p className="mt-3 text-xs font-body" style={{ color: '#FF3B30' }}>
            {error}
          </p>
        )}

        <div className="w-full flex items-center gap-3 my-5">
          <span className="flex-1 h-px" style={{ backgroundColor: colors.outline }} />
          <span className="text-xs font-body" style={{ color: colors.onSurfaceVariant }}>o</span>
          <span className="flex-1 h-px" style={{ backgroundColor: colors.outline }} />
        </div>

        <div className="w-full">
          <AppPrimaryButton
            label="Ingresar como invitado"
            variant={AppButtonVariant.outlined}
            onPressed={handleGuestLogin}
          />
        </div>

        <button
          onClick={() => { setError(null); navigate(esLogin ? AppRoutes.register : AppRoutes.login); }}
          className="mt-6 text-sm font-body"
          style={{ color: colors.onSurfaceVariant }}
        >
          {esLogin ? '¿No tienes cuenta? ' : '¿Ya tienes cuenta? '}
          <span style={{ color: colors.primary, fontWeight: 600 }}>
            {esLogin ? 'Crear una' : 'Ingresar'}
          </span>
        </button>
      </div>
    </div>
  );
}
