import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../../../../core/theme/ThemeProvider';
import { useAuth } from '../../../auth/presentation/providers/useAuth';
import { AppRoutes } from '../../../../core/router/appRoutes';

export function SplashScreen() {
  const navigate = useNavigate();
  const { colors } = useTheme();
  const { usuario, modoInvitado, loading } = useAuth();
  const [visible, setVisible] = useState(false);
  const [animacionLista, setAnimacionLista] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setVisible(true), 50);
    const t2 = setTimeout(() => setAnimacionLista(true), 1800);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  // Espera a la animación y a que termine de recuperarse la sesión guardada,
  // para no mandar al login a alguien que sí tenía sesión.
  useEffect(() => {
    if (!animacionLista || loading) return;
    const destino = (usuario != null || modoInvitado) ? AppRoutes.home : AppRoutes.login;
    navigate(destino, { replace: true });
  }, [animacionLista, loading, navigate, usuario, modoInvitado]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-surface">
      <div
        className="flex flex-col items-center transition-all duration-700 ease-out"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? 'scale(1)' : 'scale(0.7)',
        }}
      >
        <div
          className="w-24 h-24 rounded-full flex items-center justify-center text-[44px]"
          style={{ backgroundColor: colors.primary }}
        >
          🥚
        </div>
        <h1 className="mt-5 text-[36px] font-bold font-display text-on-surface">Huebito</h1>
        <p className="mt-1.5 text-sm font-body text-on-surface-variant">¿Qué cocinamos hoy?</p>
      </div>
    </div>
  );
}