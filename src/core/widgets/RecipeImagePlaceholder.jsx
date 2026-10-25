import React, { useState } from 'react';
import { useTheme } from '../theme/ThemeProvider';
import { Coffee, UtensilsCrossed, CupSoda, Moon, Soup, Salad } from 'lucide-react';
import { CategoriaSlug } from '../../features/recipes/domain/entities/categoria';

// Muestra la foto real de la receta cuando exista; si no viene, o si falla la
// carga, cae automáticamente en el ícono ilustrativo de la categoría.
// imagenUrl puede ser una ruta local o la URL del endpoint del backend que
// sirve el binario guardado en Neon: al widget le da igual cuál de las dos.
export function RecipeImagePlaceholder({ categoria, imagenUrl, borderRadius = '20px', prioridad = false }) {
  const { colors } = useTheme();
  const [imgError, setImgError] = useState(false);
  const iconosPorCategoria = {
    [CategoriaSlug.desayunos]: Coffee,
    [CategoriaSlug.almuerzos]: UtensilsCrossed,
    [CategoriaSlug.sopas]: Soup,
    [CategoriaSlug.entradas]: Salad,
    [CategoriaSlug.cenas]: Moon,
    [CategoriaSlug.bebidas]: CupSoda,
  };
  const Icon = iconosPorCategoria[categoria] || UtensilsCrossed;

  if (imagenUrl && !imgError) {
    return (
      <img
        src={imagenUrl}
        alt=""
        // Fuera de pantalla no se descargan hasta que el usuario se acerca;
        // async evita que decodificar la foto trabe el scroll o la ruleta.
        loading={prioridad ? 'eager' : 'lazy'}
        decoding="async"
        className="w-full h-full object-cover block"
        style={{ borderRadius }}
        onError={() => setImgError(true)}
      />
    );
  }

  return (
    <div
      className="w-full h-full flex items-center justify-center"
      style={{
        borderRadius,
        backgroundColor: colors.primaryTint,
      }}
    >
      <div
        className="flex items-center justify-center rounded-full"
        style={{ width: '38%', aspectRatio: '1', backgroundColor: colors.primaryTint }}
      >
        <Icon className="w-[45%] h-[45%]" style={{ color: colors.primary }} />
      </div>
    </div>
  );
}
