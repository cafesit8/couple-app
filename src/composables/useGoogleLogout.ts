import { useStorage } from '@vueuse/core'
import { push } from 'notivue'

export function useGoogleLogout() {
  const googleToken = useStorage<string | null>('google_access_token', null)
  const sharedCalendarId = useStorage<string | null>('shared_calendar_id', null)

  async function logout() {
    try {
      // Revocar el token en Google (opcional pero recomendado)
      if (googleToken.value) {
        await fetch('https://oauth2.googleapis.com/revoke', {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: `token=${googleToken.value}`
        }).catch(() => {
          // Ignorar errores de revocación, proceder con logout local
        })
      }
    } finally {
      // Limpiar datos locales
      googleToken.value = null
      sharedCalendarId.value = null

      // Notificar al usuario
      push.warning('Sesión de Google expirada. Por favor, inicia sesión nuevamente')
    }
  }

  return { logout }
}
