export const AppRoutes = {
  splash: '/',
  login: '/login',
  register: '/register',
  home: '/home',
  favorites: '/favorites',
  history: '/history',
  // `momento` filtra la ruleta a ese momento del día; lo usa la ruleta de
  // bebidas que se abre como acompañante de un plato.
  roulette: (categoria, { momento } = {}) =>
    momento ? `/roulette/${categoria}?momento=${momento}` : `/roulette/${categoria}`,
  rouletteResult: (categoria) => `/roulette/${categoria}/result`,
  recipeDetail: (id) => `/recipe/${id}`,
};