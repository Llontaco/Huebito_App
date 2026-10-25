// Paleta estilo iOS con el naranja de Huebito como único color de acento.
//
// Claro: lienzo gris niebla (#F5F5F7) con tarjetas blancas planas, como las
// listas agrupadas de iOS. Oscuro: negro puro con tarjetas gris oscuro
// (#1C1C1E), como el modo oscuro del iPhone. En los dos, las tarjetas se
// separan del fondo por tono, sin sombras ni bordes.
export const AppColors = {
  dark: {
    primary: '#E27D19',
    onPrimary: '#FFFFFF',
    // Relleno suave de los botones secundarios y fondos de íconos.
    primaryTint: 'rgba(226,125,25,0.18)',
    surface: '#000000',
    surfaceContainer: '#1C1C1E',
    // Relleno gris de controles (segmentos, pistas, chips).
    fill: 'rgba(118,118,128,0.24)',
    onSurface: '#F5F5F7',
    onSurfaceVariant: '#98989D',
    outline: '#38383A',
    neutralHandle: '#D9D9D9',
    scrim: 'rgba(0,0,0,0.6)',
  },
  light: {
    primary: '#E27D19',
    onPrimary: '#FFFFFF',
    primaryTint: 'rgba(226,125,25,0.12)',
    surface: '#F5F5F7',
    surfaceContainer: '#FFFFFF',
    fill: 'rgba(118,118,128,0.12)',
    onSurface: '#1D1D1F',
    onSurfaceVariant: '#6E6E73',
    outline: '#D2D2D7',
    neutralHandle: '#6B6560',
    scrim: 'rgba(0,0,0,0.4)',
  },
};
