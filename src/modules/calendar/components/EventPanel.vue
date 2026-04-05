<script lang="ts" setup>
import { useStorage } from '@vueuse/core'
import { computed, ref, watch } from 'vue'
import { useTokenClient } from 'vue3-google-signin'
import type { CalendarDay, CalendarEvent, EventForm } from '../types'
import { formatTime } from '../utils/calendar'

const props = defineProps<{
  selectedDate: CalendarDay | null
  eventSelected: CalendarEvent | null
  isLoading: boolean
}>()

const emit = defineEmits<{
  createEvent: [form: EventForm]
  getOrCreateSharedCalendarId: []
  updateEvent: [form: EventForm]
  deleteEventSelected: []
  deleteEvent: []
}>()

const googleToken = useStorage<string | null>('google_access_token', null)
const isConnected = computed(() => !!googleToken.value)

const EMPTY_FORM: EventForm = {
  title: '',
  description: '',
  time: '',
}

const form = ref<EventForm>({ ...EMPTY_FORM })

function resetForm() {
  form.value = { ...EMPTY_FORM }
  emit('deleteEventSelected')
}

function populateForm(event: CalendarEvent) {
  form.value = {
    title: event.summary ?? '',
    description: event.description ?? '',
    time: formatTime(event.start?.dateTime ?? ''),
  }
}

function handleCreateEvent() {
  props.eventSelected ? emit('updateEvent', { ...form.value }) : emit('createEvent', { ...form.value })
  form.value = { ...EMPTY_FORM }
}

const { login } = useTokenClient({
  async onSuccess(response) {
    if (response.access_token) {
      googleToken.value = response.access_token
      emit('getOrCreateSharedCalendarId')
    }
  },
  scope: 'https://www.googleapis.com/auth/calendar',
})

watch(
  () => props.eventSelected,
  (event) => {
    if (event) {
      populateForm(event)
    } else {
      resetForm()
    }
  },
)
</script>

<template>
  <aside class="event-panel">
    <!-- Header -->
    <div class="flex items-center justify-between mb-5" v-auto-animate>
      <h3 class="panel-title">Detalles del Evento</h3>

      <button v-if="eventSelected" class="new-event-btn" @click="resetForm">
        <svg xmlns="http://www.w3.org/2000/svg" class="size-4" viewBox="0 0 20 20" fill="currentColor">
          <path d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" />
        </svg>
        Nuevo Evento
      </button>
    </div>

    <!-- Form -->
    <div class="event-form" v-auto-animate>
      <template v-if="selectedDate">
        <p class="selected-date-label">{{ selectedDate.ariaLabel }}</p>
      </template>
      <template v-else>
        <p class="selected-date-label hint">Selecciona un día del calendario</p>
      </template>

      <div class="form-group">
        <label>Título:</label>
        <input v-model="form.title" type="text" placeholder="Sin evento" />
      </div>

      <div class="form-group">
        <label>Descripción:</label>
        <textarea v-model="form.description" placeholder="Sin descripción" />
      </div>

      <div class="form-group">
        <label>Hora:</label>
        <input v-model="form.time" type="time" placeholder="—" />
      </div>

      <div class="flex flex-col gap-2" v-auto-animate>
        <button
          class="save-btn"
          :disabled="!isConnected || isLoading"
          @click="handleCreateEvent"
        >
          {{ isLoading ? 'Guardando...' : 'Guardar' }}
        </button>
        <button
          v-if="eventSelected"
          type="button"
          class="delete-btn-simple"
          :disabled="isLoading"
          v-auto-animate
          @click="$emit('deleteEvent')"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
          {{ isLoading ? 'Eliminando...' : 'Eliminar' }}
        </button>
      </div>
    </div>

    <!-- Google Calendar Sync -->
    <div class="google-section" v-auto-animate>
      <div v-if="isConnected" class="flex items-center gap-3 p-3 bg-green-50 rounded-xl">
        <div class="relative">
          <div class="w-10 h-10 flex items-center justify-center bg-white rounded-full shadow-sm">
            <svg class="w-5 h-5" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 6.23l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
          </div>
          <span class="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full animate-pulse" />
        </div>
        <div>
          <p class="text-xs font-semibold text-green-800 uppercase tracking-wider">Sincronizado</p>
          <p class="text-sm text-green-600">Google Calendar</p>
        </div>
      </div>

      <button v-else class="google-connect-btn w-full" @click="login()">
        <svg class="w-5 h-5" viewBox="0 0 24 24">
          <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
          <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
          <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
          <path d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 6.23l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
        </svg>
        Conectar con Google
      </button>
    </div>
  </aside>
</template>

<style scoped lang="css">
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
.form-group textarea {
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
.form-group textarea:focus {
  border-color: #c4944a;
}

.save-btn {
  width: 100%;
  background: #dc9d8d;
  color: white;
  font-weight: 600;
  padding: 0.75rem;
  border-radius: 0.5rem;
  border: none;
  cursor: pointer;
  font-size: 0.9rem;
  transition: background 0.15s, transform 0.1s;
  margin-top: 0.5rem;
}
.save-btn:hover {
  background: #c8877a;
}
.save-btn:active {
  transform: scale(0.98);
}
.save-btn:disabled {
  background: #e8ddd0;
  cursor: not-allowed;
}

.delete-btn-simple {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 100%;
  padding: 10px 16px;
  
  background-color: #fef2f2; /* Red 50 */
  color: #ef4444;           /* Red 500 */
  
  border: 1px solid #fee2e2; /* Red 100 */
  border-radius: 12px;
  
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
}

.delete-btn-simple:hover {
  background-color: #fee2e2; /* Red 100 */
  color: #dc2626;           /* Red 600 */
  transform: translateY(-1px);
  box-shadow: 0 2px 4px rgba(239, 68, 68, 0.1);
}

.delete-btn-simple:active {
  transform: translateY(0);
  background-color: #fecaca; /* Red 200 */
}

.delete-btn-simple:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  filter: grayscale(1);
}

/* El icono SVG dentro del botón */
.delete-btn-simple svg {
  width: 16px;
  height: 16px;
  stroke: currentColor;
}

.google-connect-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  width: 100%;
  background: #fbf8f3;
  color: #2c2c2c;
  font-weight: 600;
  padding: 0.75rem;
  border-radius: 0.5rem;
  border: 2px solid #e8ddd0;
  cursor: pointer;
  font-size: 0.9rem;
  transition: all 0.15s;
}
.google-connect-btn:hover {
  background: #f0ebe2;
  border-color: #d4c8b8;
  box-shadow: 0 2px 8px rgba(220, 157, 141, 0.15);
}
.google-connect-btn:active {
  transform: scale(0.98);
}
</style>
