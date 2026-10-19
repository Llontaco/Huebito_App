import { slugImagen } from './slugImagen.js';

// Fotos de recetas subidas a mano a la carpeta image/ del proyecto:
//
//   image/desayunos/pan-con-palta.jpg
//   image/bebidas/chicha-morada.png
//
// Vite las encuentra al compilar, les pone un nombre con hash y las publica
// junto con la app, así que basta con agregar el archivo y desplegar. Una foto
// de esta carpeta tiene prioridad sobre la que esté guardada en la base.
const archivos = import.meta.glob('/image/*/*.{jpg,jpeg,png,webp,JPG,JPEG,PNG,WEBP}', {
  eager: true,
  query: '?url',
  import: 'default',
});

// Créditos de las fotos descargadas con licencia libre (las de Commons u
// Openverse obligan a nombrar al autor). Las fotos propias no necesitan
// entrada: sin crédito, la app simplemente no muestra la línea de atribución.
const modulosCreditos = import.meta.glob('/image/creditos.json', { eager: true, import: 'default' });
const creditos = Object.values(modulosCreditos)[0] ?? {};

// "desayunos/pan-con-palta" -> { url, credito }
const porClave = new Map();
for (const [ruta, url] of Object.entries(archivos)) {
  const [, , categoria, archivo] = ruta.split('/');
  const base = archivo.replace(/\.[^.]+$/, '').toLowerCase();
  porClave.set(`${categoria}/${base}`, { url, credito: creditos[`${categoria}/${archivo}`] ?? null });
}

export function imagenLocal(categoriaSlug, nombreReceta) {
  return porClave.get(`${categoriaSlug}/${slugImagen(nombreReceta)}`) ?? null;
}
