function aUsuario(datos) {
  if (!datos) return null;
  return {
    id: datos.id,
    nombre: datos.nombre,
    correo: datos.email,
    fotoUrl: datos.fotoUrl ?? null,
  };
}

export class AuthRepositoryImpl {
  constructor(datasource) {
    this.datasource = datasource;
    this.accessToken = null;
  }

  // Al abrir la app intenta recuperar la sesión con la cookie de refresh.
  // Si no hay cookie o expiró, simplemente no hay usuario.
  //
  // Si se pide dos veces a la vez (React en modo estricto monta los efectos
  // dos veces, o dos componentes lo piden juntos) se comparte una sola
  // petición: dos refresh con el mismo token harían que el backend lo tome
  // como un token reutilizado.
  obtenerUsuarioActual() {
    if (!this._sesionEnCurso) {
      this._sesionEnCurso = this._recuperarSesion().finally(() => {
        this._sesionEnCurso = null;
      });
    }
    return this._sesionEnCurso;
  }

  async _recuperarSesion() {
    try {
      const { accessToken } = await this.datasource.refrescar();
      this.accessToken = accessToken;
      return aUsuario(await this.datasource.obtenerPerfil(accessToken));
    } catch {
      this.accessToken = null;
      return null;
    }
  }

  async loginConGoogle(idToken) {
    const { accessToken, usuario } = await this.datasource.loginConGoogle(idToken);
    this.accessToken = accessToken;
    return aUsuario(usuario);
  }

  async cerrarSesion() {
    this.accessToken = null;
    await this.datasource.cerrarSesion().catch(() => {});
  }

  obtenerAccessToken() {
    return this.accessToken;
  }
}
