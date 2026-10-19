export class GetRecetaAleatoriaUseCase {
  constructor(repository) {
    this._repository = repository;
  }
  async call(categoria, { excluirId, momento } = {}) {
    return this._repository.getAleatoria(categoria, { excluirId, momento });
  }
}