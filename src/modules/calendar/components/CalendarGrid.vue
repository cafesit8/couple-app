<script lang="ts" setup>
import { computed } from 'vue';
import { Calendar } from 'v-calendar';
import 'v-calendar/dist/style.css';
import type { CalendarDay, CalendarEvent } from '../types';

const props = defineProps<{
  events: CalendarEvent[]
  dateSelected: CalendarDay | null
}>();

const emit = defineEmits<{
  selectDate: [date: CalendarDay, event: CalendarEvent | null],
  refreshEvents: []
}>();

const calendarAttributes = computed(() => {
  return props.events.map(event => ({
    key: event.id,
    customData: event,
  }));
});

const calendarConfig = {
  masks: { weekdays: 'WWW' },
  transparent: true,
  borderless: true,
};

const getEventsForDay = (dayId: string) => {
  return props.events.filter(event => {
    const eventDate = event.start?.dateTime;
    if (!eventDate) return false;
    
    return eventDate.startsWith(dayId);
  });
};

const getEventColorClass = (colorId?: string) => {
  const colors: Record<string, string> = {
    "1": "bg-blue-50 text-blue-600",
    "3": "bg-purple-50 text-purple-600",
    "4": "bg-pink-50 text-pink-600",
    "6": "bg-orange-50 text-orange-600",
    "7": "bg-teal-50 text-teal-600",
    "9": "bg-indigo-50 text-indigo-600",
    "11": "bg-red-50 text-red-600",
    default: "bg-gray-100 text-gray-600 border border-gray-200"
  };

  return colors[colorId || 'default'] || colors.default;
};

function getDay(day: CalendarDay) {
  const event = props.events.find(event => event.start?.dateTime.split('T')[0] === day.id);
  emit('selectDate', day, event || null);
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
      <template #day-content="{ day }">
        <div 
          class="day-wrapper flex flex-col h-full min-h-10 p-1 border border-transparent transition-colors" 
          :class="{'is-selected': day.ariaLabel === dateSelected?.ariaLabel}" 
          @click="getDay(day)"
        >
          <span 
            class="day-number text-sm font-medium text-center" 
            :class="{ 'is-today': day.isToday }"
          >
            {{ day.day }}
          </span>

          <div class="day-content mt-1 flex-1 space-y-1 overflow-y-auto scrollbar-hide">
            <div
              v-for="event in getEventsForDay(day.id)"
              :key="event.id"
              class="text-[8px] leading-tight px-1.5 py-0.5 rounded truncate font-medium shadow-sm transition-transform hover:scale-[1.02]"
              :class="getEventColorClass(event.colorId)"
            >
              {{ event.summary }}
            </div>
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
:deep(.vc-container) {
  width: auto !important;
}

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
  cursor: pointer;
  transition: background-color 0.2s ease;
}

/* Efecto hover sutil al pasar el mouse por un día */
.day-wrapper:hover {
  background-color: #f9fafa;
}

.day-wrapper.is-selected {
  background-color: #f0f3f3;
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
