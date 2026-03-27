<script lang="ts" setup>
import { useStorage } from '@vueuse/core'
import { computed } from 'vue'
import type { CalendarEvent } from '../types'
import {
  GoogleSignInButton,
  type CredentialResponse,
} from "vue3-google-signin";

const props = defineProps<{
  selectedDate: Date | null
  events: CalendarEvent[]
  formatDate: (date: Date) => string
}>()

const googleToken = useStorage<string | null>('google_access_token', null)

const isConnected = computed(() => !!googleToken.value)
const selectedEvent = computed<CalendarEvent | null>(() => {
  return props.events[0] ?? null
})
const formattedDate = computed(() => {
  if (!props.selectedDate) return ''
  const str = props.formatDate(props.selectedDate)
  return str.charAt(0).toUpperCase() + str.slice(1)
})

const handleLoginSuccess = (response: CredentialResponse) => {
  const { credential } = response;
  googleToken.value = credential ?? "not found";
};

const handleLoginError = () => {
  alert("Error al conectar con Google");
};
</script>

<template>
  <aside class="event-panel">
    <!-- Encabezado -->
    <div class="flex items-center justify-between mb-5">
      <h3 class="panel-title">Detalles del Evento</h3>
      <button class="new-event-btn">
        <svg xmlns="http://www.w3.org/2000/svg" class="size-4" viewBox="0 0 20 20" fill="currentColor">
          <path d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" />
        </svg>
        Nuevo Evento
      </button>
    </div>

    <!-- Formulario -->
    <div class="event-form">
      <p v-if="selectedDate" class="selected-date-label">
        Seleccionado: {{ formattedDate }}
      </p>
      <p v-else class="selected-date-label hint">
        Selecciona un día del calendario
      </p>

      <div class="form-group">
        <label>Título:</label>
        <input
          type="text"
          :value="selectedEvent?.titulo ?? ''"
          placeholder="Sin evento"
          readonly
        />
      </div>

      <div class="form-group">
        <label>Hora:</label>
        <input
          type="text"
          :value="selectedEvent?.hora ?? ''"
          placeholder="—"
          readonly
        />
      </div>

      <div class="form-group">
        <label>Ubicación:</label>
        <input
          type="text"
          :value="selectedEvent?.ubicacion ?? ''"
          placeholder="—"
          readonly
        />
      </div>

      <div class="toggle-row">
        <span class="toggle-label">
          Recordatorio: <strong>{{ selectedEvent?.recordatorio || 'Sin recordatorio' }}</strong>
        </span>
        <div class="toggle-switch" :class="{ on: !!selectedEvent?.recordatorio }">
          <div class="toggle-knob" />
        </div>
      </div>
    </div>

    <!-- Google Calendar Sync -->
    <div v-if="isConnected" class="flex items-center gap-3">
      <div class="relative">
        <div class="w-10 h-10 flex items-center justify-center bg-gray-50 rounded-full">
          <svg class="w-5 h-5" viewBox="0 0 24 24">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 6.23l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
          </svg>
        </div>
        <span class="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full animate-pulse"></span>
      </div>

      <div>
        <p class="text-sm font-medium text-gray-900">Google Calendar conectado</p>
      </div>
    </div>
    <GoogleSignInButton
      v-else
      @success="handleLoginSuccess"
      @error="handleLoginError"
    ></GoogleSignInButton>
  </aside>
</template>

<style scoped>
.event-panel {
  display: flex;
  flex-direction: column;
  gap: 0;
}

.panel-title {
  font-family: 'Lora Variable', serif;
  font-size: 1.25rem;
  font-weight: 600;
  color: #2c2c2c;
}

.new-event-btn {
  display: flex;
  align-items: center;
  gap: 0.35rem;
  background: #dc9d8d;
  color: white;
  font-size: 0.8rem;
  font-weight: 500;
  padding: 0.45rem 1rem;
  border-radius: 9999px;
  cursor: pointer;
  transition: background 0.15s;
}
.new-event-btn:hover {
  background: #c8877a;
}

/* Formulario */
.event-form {
  background: #fbf8f3;
  border: 1px solid #e8ddd0;
  border-radius: 1rem;
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
  margin-bottom: 0.85rem;
}

.selected-date-label {
  font-size: 0.85rem;
  color: #2c2c2c;
  font-weight: 500;
}
.selected-date-label.hint {
  color: #a09080;
  font-style: italic;
}

.form-group label {
  display: block;
  font-size: 0.75rem;
  color: #8a7a6b;
  margin-bottom: 0.2rem;
  font-weight: 500;
}

.form-group input {
  width: 100%;
  background: #fff;
  border: 1px solid #e0d5c8;
  border-radius: 0.5rem;
  padding: 0.5rem 0.75rem;
  font-size: 0.85rem;
  color: #2c2c2c;
  outline: none;
  transition: border-color 0.15s;
}
.form-group input:focus {
  border-color: #c4944a;
}

/* Toggle */
.toggle-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
}

.toggle-label {
  font-size: 0.8rem;
  color: #4a4a4a;
}

.toggle-switch {
  width: 2.75rem;
  height: 1.5rem;
  border-radius: 9999px;
  background: #ccc;
  position: relative;
  cursor: pointer;
  transition: background 0.25s;
  flex-shrink: 0;
}
.toggle-switch.on {
  background: #e74c4c;
}
.toggle-knob {
  position: absolute;
  top: 0.15rem;
  left: 0.15rem;
  width: 1.2rem;
  height: 1.2rem;
  border-radius: 9999px;
  background: #fff;
  box-shadow: 0 1px 3px rgba(0,0,0,0.2);
  transition: transform 0.25s;
}
.toggle-switch.on .toggle-knob {
  transform: translateX(1.25rem);
}
</style>
