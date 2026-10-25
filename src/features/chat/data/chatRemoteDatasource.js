import { apiRequest } from '../../../core/network/httpClient.js';

// POST /chat -> { respuesta }. La conversación completa viaja en cada pedido;
// se recortan los últimos 20 mensajes, que es lo que acepta la API.
export async function preguntarAlAsistente(mensajes) {
  const recientes = mensajes.slice(-20);
  // La API exige que la conversación empiece con el usuario.
  while (recientes.length && recientes[0].rol !== 'user') recientes.shift();
  const { respuesta } = await apiRequest('/chat', {
    method: 'POST',
    body: { mensajes: recientes.map(({ rol, texto }) => ({ rol, texto })) },
    timeoutMs: 60000,
  });
  return respuesta;
}
