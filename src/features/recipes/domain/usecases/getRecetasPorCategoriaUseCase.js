export class GetRecetasPorCategoriaUseCase {
  constructor(repository) {
    this._repository = repository;
  }
  async call(categoria, { momento } = {}) {
    return this._repository.getByCategoria(categoria, { momento });
  }
}