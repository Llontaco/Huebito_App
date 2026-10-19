import { Categoria, CategoriaSlug } from '../../domain/entities/categoria.js';

export class CategoriaModel {
  // Lanza con un slug que la app no conoce. El repositorio filtra esas
  // categorías antes de llegar aquí, así que una categoría nueva en la base
  // no tumba a una versión de la app que todavía no la sabe mostrar.
  static fromJson(json) {
    return new Categoria({
      id: json.id,
      nombre: json.nombre,
      slug: CategoriaSlug.fromStorage(json.slug),
    });
  }
}