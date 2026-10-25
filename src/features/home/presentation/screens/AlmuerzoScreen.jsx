import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../../../../core/theme/ThemeProvider';
import { AppTopBar } from '../../../../core/widgets/AppTopBar';
import { CategoriaSlug } from '../../../recipes/domain/entities/categoria';
import { AppRoutes } from '../../../../core/router/appRoutes';
import { UtensilsCrossed, Soup, Salad, ChevronRight } from 'lucide-react';

// Al elegir "Almorzar" el usuario decide qué parte del almuerzo quiere
// sortear: cada opción abre su propia ruleta.
const opciones = [
  {
    slug: CategoriaSlug.almuerzos,
    titulo: 'Almuerzo clásico',
    detalle: 'Un segundo: lomo saltado, ají de gallina, arroz con pollo…',
    icono: UtensilsCrossed,
  },
  {
    slug: CategoriaSlug.sopas,
    titulo: 'Sopa o chupe',
    detalle: 'Caldo de gallina, chupe de camarones, sopa criolla…',
    icono: Soup,
  },
  {
    slug: CategoriaSlug.entradas,
    titulo: 'Entrada',
    detalle: 'Ceviche, papa a la huancaína, causa, ocopa…',
    icono: Salad,
  },
];

export function AlmuerzoScreen() {
  const navigate = useNavigate();
  const { colors } = useTheme();

  return (
    <div className="min-h-screen bg-surface pb-6">
      <AppTopBar title="Almorzar" onBack={() => navigate(-1)} />

      <div className="px-5 mt-2">
        <h2 className="text-[27px] font-bold font-display text-on-surface">¿Qué se te antoja?</h2>
        <p className="mt-2 text-sm font-body text-on-surface-variant">
          Elige qué quieres sortear y gira la ruleta.
        </p>
      </div>

      <div className="px-5 mt-6 flex flex-col gap-3">
        {opciones.map(({ slug, titulo, detalle, icono: Icon }) => (
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
              <span className="block text-[18px] font-semibold font-body text-on-surface">{titulo}</span>
              <span className="block text-[13px] font-body text-on-surface-variant">{detalle}</span>
            </span>
            <ChevronRight size={20} className="text-on-surface-variant flex-shrink-0" />
          </button>
        ))}
      </div>
    </div>
  );
}
