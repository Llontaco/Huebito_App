import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { AuthRemoteDatasource } from '../../data/datasources/authRemoteDatasource.js';
import { AuthRepositoryImpl } from '../../data/repositories/authRepositoryImpl.js';
import { LoginUseCase } from '../../domain/usecases/loginUseCase.js';
import { CerrarSesionUseCase } from '../../domain/usecases/cerrarSesionUseCase.js';

const datasource = new AuthRemoteDatasource();
export const authRepository = new AuthRepositoryImpl(datasource);
const loginUC = new LoginUseCase(authRepository);
const cerrarSesionUC = new CerrarSesionUseCase(authRepository);

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(null);
  const [modoInvitado, setModoInvitado] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    authRepository.obtenerUsuarioActual()
      .then((u) => setUsuario(u))
      .finally(() => setLoading(false));
  }, []);

  // Sirve igual para entrar y para registrarse: si el correo de Google no
  // existe todavía, el backend crea el usuario.
  const loginConGoogle = useCallback(async (idToken) => {
    setLoading(true);
    setError(null);
    try {
      const u = await loginUC.call(idToken);
      setUsuario(u);
      setModoInvitado(false);
      return u;
    } catch (e) {
      setError(e.status ? e.message : 'No se pudo conectar con el servidor. Inténtalo de nuevo.');
      throw e;
    } finally {
      setLoading(false);
    }
  }, []);

  const cerrarSesion = useCallback(async () => {
    await cerrarSesionUC.call();
    window.google?.accounts?.id?.disableAutoSelect();
    setUsuario(null);
    setModoInvitado(false);
  }, []);

  const continuarComoInvitado = useCallback(() => {
    setModoInvitado(true);
  }, []);

  const autenticado = usuario !== null || modoInvitado;

  return (
    <AuthContext.Provider value={{
      usuario, loading, error, setError,
      loginConGoogle, cerrarSesion,
      continuarComoInvitado, modoInvitado, autenticado,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be inside AuthProvider');
  return ctx;
}
