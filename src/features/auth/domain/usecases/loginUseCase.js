export class LoginUseCase {
  constructor(repository) {
    this.repository = repository;
  }

  call(idTokenGoogle) {
    return this.repository.loginConGoogle(idTokenGoogle);
  }
}
