import { apiRequest } from '../../../../core/network/httpClient.js';

// Habla con /auth de Huebito_API. El refresh token vive en una cookie httpOnly
// que pone el backend, así que el front nunca lo toca: solo guarda el access
// token en memoria.
export class AuthRemoteDatasource {
  // idToken es la credencial firmada que devuelve Google Identity Services.
  // El backend la verifica y crea el usuario si es la primera vez.
  async loginConGoogle(idToken) {
    return apiRequest('/auth/google', { method: 'POST', body: { idToken } });
  }

  async refrescar() {
    return apiRequest('/auth/refresh', { method: 'POST', body: {} });
  }

  async obtenerPerfil(accessToken) {
    return apiRequest('/users/me', { token: accessToken });
  }

  async cerrarSesion() {
    return apiRequest('/auth/logout', { method: 'POST', body: {} });
  }
}
