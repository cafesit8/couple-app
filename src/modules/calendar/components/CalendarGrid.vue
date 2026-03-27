<script lang="ts" setup>
import { computed } from 'vue';
import { Calendar } from 'v-calendar';
import 'v-calendar/dist/style.css';
import type { CalendarEvent } from '../types';

const props = defineProps<{
  events: CalendarEvent[] // Pasamos todos los eventos directamente
}>();

const emit = defineEmits<{
  selectDate: [date: Date]
}>();

// Transformamos los eventos en atributos que V-Calendar entiende
const calendarAttributes = computed(() => {
  return props.events.map(event => ({
    key: event.id,
    customData: event,  // Guardamos todo el objeto aquí para el slot
  }));
});

// Configuración estética del calendario
const calendarConfig = {
  masks: { weekdays: 'WWW' }, // 'Lun', 'Mar', etc.
  transparent: true,
  borderless: true,
};

function handleDayClick(day: any) {
  console.log(day);
}
</script>

<template>
  <div class="memories-calendar-container">
    <Calendar
      expanded
      :attributes="calendarAttributes"
      v-bind="calendarConfig"
      class="custom-calendar"
    >
      <template #day-content="{ day, attributes }">
        <div class="day-wrapper" @click="handleDayClick(day)">
          <span 
            class="day-number" 
            :class="{ 'is-today': day.isToday }"
          >
            {{ day.day }}
          </span>

          <div class="day-content">
            <template v-if="attributes.length > 0">
              <div 
                v-for="{ customData: event } in attributes" 
                :key="event.id"
                class="event-item"
              >
                <div v-if="event.imagen" class="photo-container">
                  <img :src="event.imagen" :alt="event.titulo" class="photo-img" />
                </div>

                <svg v-else-if="event.favorito" class="icon-red" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clip-rule="evenodd" />
                </svg>
              </div>
            </template>
          </div>
        </div>
      </template>
    </Calendar>
  </div>
</template>

<style scoped>
/* Contenedor principal */
.memories-calendar-container {
  background-color: #ffffff;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.04);
  max-width: 900px;
  margin: 0 auto;
}

/* --- Ajustes estructurales de V-Calendar --- */
:deep(.vc-pane) {
  font-family: inherit;
}

/* Encabezado de los días (Lun, Mar, Mié...) */
:deep(.vc-weekday) {
  color: #a0a0a0;
  font-size: 13px;
  font-weight: 600;
  text-transform: capitalize;
  padding-bottom: 12px;
}

/* Contenedor de la grilla: Añadimos bordes superior e izquierdo */
:deep(.vc-weeks) {
  border-top: 1px solid #eaeaea;
  border-left: 1px solid #eaeaea;
  margin-top: 8px;
}

/* Celdas de los días: Añadimos bordes derecho e inferior y reducimos altura */
:deep(.vc-day) {
  min-height: 85px; /* Cuadrados más compactos */
  border-right: 1px solid #eaeaea;
  border-bottom: 1px solid #eaeaea;
  padding: 4px;
  background-color: #ffffff;
}

/* --- Estilos de tu contenido personalizado --- */
.day-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  width: 100%;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

/* Efecto hover sutil al pasar el mouse por un día */
.day-wrapper:hover {
  background-color: #f9fafa;
}

/* Números de los días */
.day-number {
  font-size: 13px;
  color: #555555;
  margin-top: 2px;
  margin-bottom: 4px;
}

/* Resaltar el día de hoy */
.day-number.is-today {
  color: #e11d48;
  font-weight: 700;
  background-color: #ffe4e6;
  padding: 2px 6px;
  border-radius: 12px;
}

/* Contenedor central para fotos y corazones */
.day-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: 1;
  width: 100%;
}

/* Estilos para las fotos de los recuerdos */
.photo-container {
  width: 38px;
  height: 38px;
  border-radius: 50%;
  overflow: hidden;
  border: 2px solid #ffffff;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.15);
}

.photo-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* Iconos */
.icon-red {
  width: 22px;
  height: 22px;
  color: #fb7185;
}

.icon-beige {
  width: 18px;
  height: 18px;
  color: #f3f4f6;
}
</style>
