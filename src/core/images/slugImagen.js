// Nombre de archivo (sin extensión) que le corresponde a una receta dentro de
// la carpeta image/<categoria>/. "Pan con palta" -> "pan-con-palta",
// "Champús" -> "champus", "Ají de Gallina" -> "aji-de-gallina".
//
// Lo usan tanto la app (para encontrar la foto) como los scripts de
// database/imagenes (para guardarla y para listar los nombres esperados), así
// que tiene que ser JavaScript plano, sin nada propio de Vite.
export function slugImagen(nombre) {
  return String(nombre ?? '')
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '') // tildes y la virgulilla de la ñ
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export const CARPETA_IMAGENES = 'image';
export const EXTENSIONES_IMAGEN = ['jpg', 'jpeg', 'png', 'webp'];
