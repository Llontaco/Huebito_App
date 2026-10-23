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
  async obtenerUsuarioActual() {
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
