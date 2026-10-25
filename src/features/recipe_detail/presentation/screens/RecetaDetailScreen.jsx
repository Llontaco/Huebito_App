import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTheme } from '../../../../core/theme/ThemeProvider';
import { AppTopBar } from '../../../../core/widgets/AppTopBar';
import { AppIconButton } from '../../../../core/widgets/AppIconButton';
import { AppPrimaryButton, AppButtonVariant } from '../../../../core/widgets/AppPrimaryButton';
import { StatBlock } from '../../../../core/widgets/StatBlock';
import { RecipeImagePlaceholder } from '../../../../core/widgets/RecipeImagePlaceholder';
import { CreditoImagen } from '../../../../core/widgets/CreditoImagen';
import { RecetaVideoSection } from '../../../../core/widgets/RecetaVideoSection';
import { useFavoritos } from '../../../favorites/presentation/providers/useFavoritos';
import { useHistorial } from '../../../history/presentation/providers/useHistorial';
import { Dificultad } from '../../../recipes/domain/entities/dificultad';
import { CategoriaSlug, Momento } from '../../../recipes/domain/entities/categoria';
import { AppRoutes } from '../../../../core/router/appRoutes';
import { Coffee, UtensilsCrossed, Share2, Heart, RotateCcw, Home, CupSoda, Check, ChevronRight } from 'lucide-react';

export function RecetaDetailScreen({ receta: propReceta, mostrarVolverAGirar = false }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { colors } = useTheme();
  const { toggle, esFavorito } = useFavoritos();
  const { registrarVisita } = useHistorial();

  const receta = propReceta || location.state?.receta;
  // Plato que ya salió en la ruleta: solo viene cuando esta receta es la
  // bebida sorteada como su acompañante.
  const plato = location.state?.plato ?? null;
  const [visible, setVisible] = useState(false);
  const [sinAcompanante, setSinAcompanante] = useState(false);

  useEffect(() => {
    // Se llega aquí desde otra pantalla ya scrolleada (p. ej. el detalle del
    // plato): el resultado nuevo tiene que empezar arriba.
    window.scrollTo(0, 0);
    setSinAcompanante(false);
    if (receta?.id) registrarVisita(receta.id);
    const t = setTimeout(() => setVisible(true), 50);
    return () => clearTimeout(t);
  }, [receta?.id]);

  if (!receta) return null;

  const esFav = esFavorito(receta.id);
  const momentoDelPlato = Momento.deCategoria[receta.categoriaSlug];
  const ofrecerAcompanante =
    mostrarVolverAGirar && CategoriaSlug.platos.includes(receta.categoriaSlug) && !sinAcompanante;
  const momentoCombinacion = location.state?.momento ?? Momento.deCategoria[plato?.categoriaSlug];
  // Dentro de la ruleta la combinación la deciden los sorteos: en el plato no
  // se sugiere bebida (para eso está la ruleta de acompañante) y en la bebida
  // no se sugiere con qué comerla (el plato ya salió). Fuera de la ruleta, por
  // ejemplo desde favoritos, ambas sugerencias se siguen mostrando.
  const esBebida = receta.categoriaSlug === CategoriaSlug.bebidas;
  const mostrarBebidaSugerida = !!receta.bebida && !(mostrarVolverAGirar && !esBebida);
  const mostrarAcompanamiento = !!receta.acompanamiento && !(mostrarVolverAGirar && esBebida);

  const handleShare = async () => {
    const text = `Prueba "${receta.nombre}" 🇵🇪 — la encontré en Huebito.`;
    if (navigator.share) {
      await navigator.share({ title: receta.nombre, text });
    } else {
      await navigator.clipboard.writeText(text);
    }
  };

  return (
    <div className="min-h-screen bg-surface">
      <AppTopBar onBack={() => navigate(-1)} />
      <div
        className="px-5 pb-8 transition-all duration-500 ease-out"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(12px)',
        }}
      >
        <div className="w-full aspect-[1.3] rounded-card overflow-hidden">
          <RecipeImagePlaceholder categoria={receta.categoriaSlug} imagenUrl={receta.imagenUrl} prioridad />
        </div>
        <CreditoImagen
          autor={receta.imagenAutor}
          licencia={receta.imagenLicencia}
          fuente={receta.imagenFuente}
        />

        <div className="receta-texto">
          <h1 className="mt-6 text-[30px] font-bold font-display tracking-[-0.03em] leading-tight text-on-surface">{receta.nombre}</h1>
          <p className="mt-2 text-sm font-body text-on-surface-variant leading-relaxed">
            {receta.descripcion}
          </p>
        </div>

        {ofrecerAcompanante && (
          <AcompananteCard
            momento={momentoDelPlato}
            onSi={() =>
              navigate(AppRoutes.roulette(CategoriaSlug.bebidas, { momento: momentoDelPlato }), {
                state: { plato: receta },
              })
            }
            onNo={() => setSinAcompanante(true)}
          />
        )}

        {mostrarVolverAGirar && plato && (
          <CombinacionCard
            momento={momentoCombinacion}
            plato={plato}
            bebida={receta}
            onVerPlato={() => navigate(AppRoutes.recipeDetail(plato.id))}
          />
        )}

        <div className="mt-6">
          <StatBlock
            items={[
              { label: 'Tiempo', value: `${receta.tiempoMinutos} min` },
              { label: 'Dificultad', value: Dificultad.getLabel(receta.dificultad) },
            ]}
          />
        </div>

        {(mostrarBebidaSugerida || mostrarAcompanamiento) && (
          <div className="mt-6 flex gap-4">
            {mostrarBebidaSugerida && (
              <InfoChip icon={Coffee} label="Bebida" value={receta.bebida} />
            )}
            {mostrarAcompanamiento && (
              <InfoChip icon={UtensilsCrossed} label="Acompañamiento" value={receta.acompanamiento} />
            )}
          </div>
        )}

        <div className="receta-texto">
          <h3 className="mt-8 text-[18px] font-semibold font-body text-on-surface">Ingredientes</h3>
          <ul className="mt-3 space-y-2">
            {receta.ingredientes.map((ing, i) => (
              <li key={i} className="flex items-start gap-2.5 text-sm font-body text-on-surface">
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: colors.primary }} />
                {ing}
              </li>
            ))}
          </ul>

          <h3 className="mt-8 text-[18px] font-semibold font-body text-on-surface">Preparación</h3>
          <ol className="mt-3 space-y-3">
            {receta.preparacion.map((paso, i) => (
              <li key={i} className="flex items-start gap-2.5 text-sm font-body text-on-surface">
                <span
                  className="w-[22px] h-[22px] rounded-full flex items-center justify-center text-[12px] font-medium flex-shrink-0"
                  style={{ backgroundColor: colors.surfaceContainer }}
                >
                  {i + 1}
                </span>
                {paso}
              </li>
            ))}
          </ol>
        </div>

        <RecetaVideoSection videoUrl={receta.videoUrl} nombre={receta.nombre} />

        {mostrarVolverAGirar && (
          <div className="mt-8 flex flex-col gap-3">
            <AppPrimaryButton
              label="Volver a girar"
              icon={RotateCcw}
              onPressed={() => navigate(-1)}
            />
            <AppPrimaryButton
              label="Volver al inicio"
              icon={Home}
              variant={AppButtonVariant.outlined}
              onPressed={() => navigate(AppRoutes.home)}
            />
          </div>
        )}

        <div className="mt-4 flex gap-4">
          <div className="flex-1">
            <AppPrimaryButton
              label={esFav ? 'Guardado' : 'Guardar favorito'}
              icon={Heart}
              variant={AppButtonVariant.outlined}
              onPressed={() => toggle(receta.id)}
            />
          </div>
          <AppIconButton icon={Share2} onPressed={handleShare} filled label="Compartir receta" />
        </div>
      </div>
    </div>
  );
}

const nombreDelMomento = {
  [Momento.desayuno]: 'desayuno',
  [Momento.almuerzo]: 'almuerzo',
  [Momento.cena]: 'cena',
};

// Aparece en el resultado de la ruleta de un plato: ofrece girar una segunda
// ruleta con las bebidas del mismo momento del día.
function AcompananteCard({ momento, onSi, onNo }) {
  const { colors } = useTheme();
  return (
    <div className="mt-6 p-4 rounded-card" style={{ backgroundColor: colors.surfaceContainer }}>
      <div className="flex items-center gap-2">
        <CupSoda size={20} style={{ color: colors.primary }} />
        <p className="text-[16px] font-semibold font-body text-on-surface">¿Quieres un acompañante?</p>
      </div>
      <p className="mt-1 text-sm font-body text-on-surface-variant">
        Gira la ruleta de bebidas para tu {nombreDelMomento[momento] ?? 'comida'}.
      </p>
      <div className="mt-4 flex gap-3">
        <div className="flex-1">
          <AppPrimaryButton label="Sí" icon={Check} onPressed={onSi} />
        </div>
        <div className="flex-1">
          <AppPrimaryButton label="No, gracias" variant={AppButtonVariant.outlined} onPressed={onNo} />
        </div>
      </div>
    </div>
  );
}

// Resumen final cuando la receta mostrada es la bebida acompañante: deja a
// mano el plato que salió en la primera ruleta.
function CombinacionCard({ momento, plato, bebida, onVerPlato }) {
  const { colors } = useTheme();
  return (
    <div className="mt-6 p-4 rounded-card" style={{ backgroundColor: colors.surfaceContainer }}>
      <p className="text-[13px] font-body text-on-surface-variant">
        Tu {nombreDelMomento[momento] ?? 'comida'} de hoy
      </p>
      <button onClick={onVerPlato} className="mt-3 w-full flex items-center gap-3 text-left">
        <UtensilsCrossed size={20} style={{ color: colors.primary }} className="flex-shrink-0" />
        <span className="flex-1 text-sm font-body text-on-surface">{plato.nombre}</span>
        <ChevronRight size={18} className="text-on-surface-variant flex-shrink-0" />
      </button>
      <div className="mt-3 flex items-center gap-3">
        <CupSoda size={20} style={{ color: colors.primary }} className="flex-shrink-0" />
        <span className="flex-1 text-sm font-body text-on-surface">{bebida.nombre}</span>
      </div>
    </div>
  );
}

function InfoChip({ icon: Icon, label, value }) {
  const { colors } = useTheme();
  return (
    <div
      className="flex-1 flex items-center gap-2 p-4 rounded-card"
      style={{ backgroundColor: colors.surfaceContainer }}
    >
      <Icon size={20} style={{ color: colors.primary }} />
      <div className="min-w-0">
        <p className="text-[13px] font-body text-on-surface-variant">{label}</p>
        <p className="text-sm font-body text-on-surface truncate">{value}</p>
      </div>
    </div>
  );
}