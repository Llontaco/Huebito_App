import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../../../../core/theme/ThemeProvider';
import { AppIconButton } from '../../../../core/widgets/AppIconButton';
import { AppPrimaryButton, AppButtonVariant } from '../../../../core/widgets/AppPrimaryButton';
import { RecipeCard } from '../../../../core/widgets/RecipeCard';
import { useAuth } from '../../../auth/presentation/providers/useAuth';
import { useFavoritos } from '../../../favorites/presentation/providers/useFavoritos';
import { useHistorial } from '../../../history/presentation/providers/useHistorial';
import { CategoriaSlug } from '../../../recipes/domain/entities/categoria';
import { AppRoutes } from '../../../../core/router/appRoutes';
import { Dices, LogOut, Sunrise, Sun, Moon, ChevronRight } from 'lucide-react';

// Las tres opciones del menú principal: cada una abre la ruleta de su comida.
const opcionesDelDia = [
  { slug: CategoriaSlug.desayunos, verbo: 'Desayunar', detalle: 'Ruleta de desayunos', icono: Sunrise },
  { slug: CategoriaSlug.almuerzos, verbo: 'Almorzar', detalle: 'Ruleta de almuerzos', icono: Sun },
  { slug: CategoriaSlug.cenas, verbo: 'Cenar', detalle: 'Ruleta de cenas', icono: Moon },
];

export function HomeScreen() {
  const navigate = useNavigate();
  const { colors } = useTheme();
  const { usuario, cerrarSesion } = useAuth();
  const { favoritos, loading: loadingFav } = useFavoritos();
  const { recientes, loading: loadingRec } = useHistorial();

  const handleLogout = async () => {
    await cerrarSesion();
    navigate(AppRoutes.login, { replace: true });
  };

  return (
    <div className="min-h-screen bg-surface pb-6">
      <div className="px-5 pt-4 pb-2 flex items-center justify-between">
        <h1 className="text-[20px] font-medium font-body text-on-surface">
          {usuario ? `Hola, ${usuario.nombre} 👋` : 'Hola 👋'}
        </h1>
        <AppIconButton icon={LogOut} onPressed={handleLogout} />
      </div>

      <div className="px-5 mt-2">
        <h2 className="text-[27px] font-bold font-display text-on-surface">¿Qué quieres hacer hoy?</h2>
      </div>

      <div className="px-5 mt-6 flex flex-col gap-3">
        {opcionesDelDia.map(({ slug, verbo, detalle, icono: Icon }) => (
          <button
            key={slug}
            onClick={() => navigate(AppRoutes.roulette(slug))}
            className="w-full flex items-center gap-4 px-4 py-4 rounded-[20px] text-left"
            style={{ backgroundColor: colors.surfaceContainer }}
          >
            <span
              className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
              style={{ backgroundColor: `${colors.primary}26` }}
            >
              <Icon size={24} style={{ color: colors.primary }} />
            </span>
            <span className="flex-1 min-w-0">
              <span className="block text-[18px] font-semibold font-body text-on-surface">{verbo}</span>
              <span className="block text-[13px] font-body text-on-surface-variant">{detalle}</span>
            </span>
            <ChevronRight size={20} className="text-on-surface-variant flex-shrink-0" />
          </button>
        ))}
      </div>

      <div className="px-5 mt-4">
        <AppPrimaryButton
          label="Sorpréndeme"
          icon={Dices}
          variant={AppButtonVariant.outlined}
          onPressed={() => {
            const cat = CategoriaSlug.comidas[Math.floor(Math.random() * CategoriaSlug.comidas.length)];
            navigate(AppRoutes.roulette(cat));
          }}
        />
      </div>

      <Section
        title="Recetas favoritas"
        onVerTodas={() => navigate(AppRoutes.favorites)}
        recetas={favoritos}
        loading={loadingFav}
        emptyLabel="Aún no tienes favoritos"
        navigate={navigate}
      />

      <Section
        title="Últimos vistos"
        onVerTodas={() => navigate(AppRoutes.history)}
        recetas={recientes}
        loading={loadingRec}
        emptyLabel="Todavía no giraste la ruleta"
        navigate={navigate}
      />
    </div>
  );
}

function Section({ title, onVerTodas, recetas, loading, emptyLabel, navigate }) {
  const { colors } = useTheme();
  return (
    <div className="px-5 mt-8">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-[18px] font-semibold font-body text-on-surface">{title}</h3>
        <button
          onClick={onVerTodas}
          className="text-[12px] font-medium font-body tracking-wider"
          style={{ color: colors.primary }}
        >
          Ver todas
        </button>
      </div>

      {loading && recetas.length === 0 ? (
        <div className="h-[170px] flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
      ) : recetas.length === 0 ? (
        <div className="h-[60px] flex items-center justify-center">
          <p className="text-sm font-body text-on-surface-variant">{emptyLabel}</p>
        </div>
      ) : (
        <div className="flex gap-4 overflow-x-auto pb-2 snap-x">
          {recetas.map((receta) => (
            <RecipeCard
              key={receta.id}
              receta={receta}
              onTap={() => navigate(AppRoutes.recipeDetail(receta.id))}
            />
          ))}
        </div>
      )}
    </div>
  );
}