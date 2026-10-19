export const CategoriaSlug = {
  desayunos: 'desayunos',
  almuerzos: 'almuerzos',
  cenas: 'cenas',
  bebidas: 'bebidas',
};

CategoriaSlug.values = [CategoriaSlug.desayunos, CategoriaSlug.almuerzos, CategoriaSlug.cenas, CategoriaSlug.bebidas];

// Categorías de platos, una por comida del día. Las bebidas quedan aparte:
// se sortean como acompañante del plato, no como comida principal.
CategoriaSlug.comidas = [CategoriaSlug.desayunos, CategoriaSlug.almuerzos, CategoriaSlug.cenas];

// Etiqueta visible de cada categoría, para tabs y botones.
CategoriaSlug.labels = {
  [CategoriaSlug.desayunos]: 'Desayunos',
  [CategoriaSlug.almuerzos]: 'Almuerzos',
  [CategoriaSlug.cenas]: 'Cenas',
  [CategoriaSlug.bebidas]: 'Bebidas',
};

// Título que muestra la ruleta según la categoría que se esté girando.
CategoriaSlug.preguntas = {
  [CategoriaSlug.desayunos]: '¿Qué desayuno hoy?',
  [CategoriaSlug.almuerzos]: '¿Qué almuerzo hoy?',
  [CategoriaSlug.cenas]: '¿Qué ceno hoy?',
  [CategoriaSlug.bebidas]: '¿Qué tomo hoy?',
};

CategoriaSlug.esValido = (value) => CategoriaSlug.values.includes(value);

CategoriaSlug.fromStorage = (value) => {
  const found = CategoriaSlug.values.find((c) => c === value);
  if (!found) throw new Error(`Categoría desconocida: ${value}`);
  return found;
};

// Momento del día al que pertenece cada comida. La API filtra las bebidas por
// este valor para que el acompañante calce con el plato: café o jugo en el
// desayuno, refrescos en el almuerzo, infusiones en la cena.
export const Momento = {
  desayuno: 'desayuno',
  almuerzo: 'almuerzo',
  cena: 'cena',
};

Momento.values = [Momento.desayuno, Momento.almuerzo, Momento.cena];

Momento.deCategoria = {
  [CategoriaSlug.desayunos]: Momento.desayuno,
  [CategoriaSlug.almuerzos]: Momento.almuerzo,
  [CategoriaSlug.cenas]: Momento.cena,
};

// Título de la ruleta de acompañante para cada momento.
Momento.preguntasBebida = {
  [Momento.desayuno]: '¿Qué tomo con mi desayuno?',
  [Momento.almuerzo]: '¿Qué tomo con mi almuerzo?',
  [Momento.cena]: '¿Qué tomo con mi cena?',
};

Momento.esValido = (value) => Momento.values.includes(value);

export class Categoria {
  constructor({ id, nombre, slug }) {
    this.id = id;
    this.nombre = nombre;
    this.slug = slug;
  }
}
