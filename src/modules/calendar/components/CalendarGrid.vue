<script lang="ts" setup>
import { computed, ref } from 'vue';
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

const modalDay = ref<CalendarDay | null>(null);
const modalEvents = ref<CalendarEvent[]>([]);
const modalAnchor = ref<{ top: number; left: number } | null>(null);

const calendarAttributes = computed(() =>
  props.events.map(event => ({
    key: event.id,
    customData: event,
  }))
);

const calendarConfig = {
  masks: { weekdays: 'WWW' },
  transparent: true,
  borderless: true,
};

const getEventsForDay = (dayId: string) =>
  props.events.filter(event => event.start?.dateTime?.startsWith(dayId));

const getEventColorClass = (colorId?: string) => {
  const colors: Record<string, string> = {
    '1': 'bg-blue-50 text-blue-600',
    '3': 'bg-purple-50 text-purple-600',
    '4': 'bg-pink-50 text-pink-600',
    '6': 'bg-orange-50 text-orange-600',
    '7': 'bg-teal-50 text-teal-600',
    '9': 'bg-indigo-50 text-indigo-600',
    '11': 'bg-red-50 text-red-600',
    default: 'bg-gray-100 text-gray-600 border border-gray-200',
  };
  return colors[colorId ?? 'default'] ?? colors.default;
};

function handleDayClick(day: CalendarDay, $event: MouseEvent) {
  const dayEvents = getEventsForDay(day.id);

  if (dayEvents.length === 0) {
    emit('selectDate', day, null);
    return;
  }

  if (dayEvents.length === 1) {
    emit('selectDate', day, dayEvents[0]!);
    return;
  }

  const rect = ($event.currentTarget as HTMLElement).getBoundingClientRect();
  modalAnchor.value = { top: rect.bottom + window.scrollY + 6, left: rect.left + window.scrollX };
  modalDay.value = day;
  modalEvents.value = dayEvents;
}

function selectEventFromModal(event: CalendarEvent) {
  if (!modalDay.value) return;
  emit('selectDate', modalDay.value, event);
  closeModal();
}

function closeModal() {
  modalDay.value = null;
  modalEvents.value = [];
  modalAnchor.value = null;
}
</script>

<template>
  <!-- Backdrop invisible para cerrar el modal al click fuera -->
  <div v-if="modalDay" class="modal-backdrop" @click="closeModal" />

  <!-- Modal flotante -->
  <Teleport to="body">
    <div
      v-if="modalDay && modalAnchor"
      class="event-picker"
      :style="{ top: `${modalAnchor.top}px`, left: `${modalAnchor.left}px` }"
    >
      <p class="event-picker__heading">{{ modalDay.ariaLabel }}</p>
      <ul class="event-picker__list">
        <li
          v-for="event in modalEvents"
          :key="event.id"
          class="event-picker__item"
          :class="getEventColorClass(event.colorId)"
          @click="selectEventFromModal(event)"
        >
          <span class="event-picker__dot" />
          <span class="event-picker__label">{{ event.summary }}</span>
          <span class="event-picker__time">
            {{ event.start?.dateTime ? new Date(event.start.dateTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '' }}
          </span>
        </li>
      </ul>
    </div>
  </Teleport>

  <div class="memories-calendar-container">
    <Calendar
      expanded
      :attributes="calendarAttributes"
      v-bind="calendarConfig"
      class="custom-calendar"
    >
      <template #day-content="{ day }">
        <div
          class="day-wrapper"
          :class="{ 'is-selected': day.ariaLabel === dateSelected?.ariaLabel }"
          @click="handleDayClick(day, $event)"
        >
          <span class="day-number" :class="{ 'is-today': day.isToday }">
            {{ day.day }}
          </span>

          <div class="day-content">
            <div
              v-for="event in getEventsForDay(day.id)"
              :key="event.id"
              class="event-pill"
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
.memories-calendar-container {
  background-color: #ffffff;
  border-radius: 1.25rem;
  padding: clamp(8px, 3vw, 20px);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.04);
  width: 100%;
  max-width: 900px;
  margin: 0 auto;
  box-sizing: border-box;
}

/* --- V-Calendar overrides --- */
:deep(.vc-container) {
  width: 100% !important;
}

:deep(.vc-header) {
  padding: clamp(4px, 2vw, 12px) 0;
}

:deep(.vc-title) {
  font-size: clamp(13px, 3vw, 18px);
}

:deep(.vc-arrow) {
  width: clamp(24px, 5vw, 32px);
  height: clamp(24px, 5vw, 32px);
}

:deep(.vc-weekday) {
  color: #a0a0a0;
  font-size: clamp(9px, 1.8vw, 13px);
  font-weight: 600;
  text-transform: capitalize;
  padding-bottom: clamp(4px, 1.5vw, 12px);
}

:deep(.vc-weeks) {
  border-top: 1px solid #eaeaea;
  border-left: 1px solid #eaeaea;
  margin-top: 8px;
}

:deep(.vc-day) {
  border-right: 1px solid #eaeaea;
  border-bottom: 1px solid #eaeaea;
  background-color: #ffffff;
  /* altura dinámica basada en el viewport */
  height: clamp(36px, 10vw, 90px);
  overflow: hidden;
}

/* --- Day cell --- */
.day-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  padding: clamp(2px, 0.8vw, 5px);
  cursor: pointer;
  transition: background-color 0.2s ease;
  box-sizing: border-box;
}

.day-wrapper:hover   { background-color: #f9fafa; }
.day-wrapper.is-selected { background-color: #f0f3f3; }

/* --- Day number --- */
.day-number {
  font-size: clamp(9px, 2vw, 13px);
  color: #555555;
  line-height: 1;
  margin-bottom: clamp(2px, 0.5vw, 5px);
  flex-shrink: 0;
}

.day-number.is-today {
  color: #e11d48;
  font-weight: 700;
  background-color: #ffe4e6;
  padding: 2px clamp(3px, 1vw, 6px);
  border-radius: 12px;
}

/* --- Events area --- */
.day-content {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 2px;
  width: 100%;
  flex: 1;
  overflow: hidden;
}

/* --- Event pill --- */
.event-pill {
  font-size: clamp(7px, 1.4vw, 9px);
  line-height: 1.2;
  padding: 1px clamp(2px, 0.6vw, 5px);
  border-radius: 4px;
  font-weight: 500;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 100%;
  box-sizing: border-box;
}

/* --- Modal backdrop --- */
.modal-backdrop {
  position: fixed;
  inset: 0;
  z-index: 40;
}

/* --- Event picker modal --- */
.event-picker {
  position: absolute;
  z-index: 50;
  min-width: 180px;
  max-width: 260px;
  background: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 10px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.10), 0 2px 6px rgba(0, 0, 0, 0.06);
  padding: 8px 0;
  animation: picker-in 0.15s ease;
}

@keyframes picker-in {
  from { opacity: 0; transform: translateY(-4px) scale(0.97); }
  to   { opacity: 1; transform: translateY(0) scale(1); }
}

.event-picker__heading {
  font-size: 11px;
  font-weight: 600;
  color: #9ca3af;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  padding: 0 12px 6px;
  border-bottom: 1px solid #f3f4f6;
  margin-bottom: 4px;
}

.event-picker__list {
  display: flex;
  flex-direction: column;
  gap: 2px;
  list-style: none;
  margin: 0;
  padding: 0;
  max-height: 200px;
  overflow-y: auto;
}

.event-picker__item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 7px 12px;
  cursor: pointer;
  transition: filter 0.1s ease;
  border-radius: 6px;
  margin: 0 4px;
}

.event-picker__item:hover { filter: brightness(0.95); }

.event-picker__dot {
  flex-shrink: 0;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: currentColor;
  opacity: 0.7;
}

.event-picker__label {
  flex: 1;
  font-size: 12px;
  font-weight: 500;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.event-picker__time {
  flex-shrink: 0;
  font-size: 10px;
  opacity: 0.6;
}
</style>