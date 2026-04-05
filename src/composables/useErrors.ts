import type { AxiosError } from "axios";
import { push } from "notivue";

export function useErrors() {
  const errorsMessage = {
    401: "Debes iniciar sesión nuevamente",
    403: "No tienes permisos para acceder a este calendario",
    500: "Ha ocurrido un error interno, por favor intenta nuevamente",
  }

  function notification(error: AxiosError) {
    const code = error.response?.status;
    const message = code && code in errorsMessage ? errorsMessage[code as keyof typeof errorsMessage] : 'Error Desconocido';
    push.error(message);
  }

  return {
    notification
  }
}