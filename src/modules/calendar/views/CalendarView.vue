<script lang="ts" setup>
import { computed } from 'vue'
import { calendarEvents } from '../data/events'
import { useCalendar } from '../composables/useCalendar'
import CalendarHeader from '../components/CalendarHeader.vue'
import CalendarGrid from '../components/CalendarGrid.vue'
import EventPanel from '../components/EventPanel.vue'

const {
  selectedDate,
  monthLabel,
  prevMonth,
  nextMonth,
  getEventsForDate,
  formatSelectedDate,
} = useCalendar(calendarEvents)

const selectedEvents = computed(() => {
  if (!selectedDate.value) return []
  return getEventsForDate(selectedDate.value)
})
</script>

<template>
  <div class="w-full h-full flex justify-center overflow-auto">
    <div class="calendar-layout">
      <!-- Panel izquierdo: Calendario -->
      <div class="calendar-card">
        <CalendarHeader
          :month-label="monthLabel"
          @prev="prevMonth"
          @next="nextMonth"
        />
        <CalendarGrid
          :events="[]"
        />
      </div>

      <!-- Panel derecho: Detalles -->
      <div class="details-card">
        <EventPanel
          :selected-date="selectedDate"
          :events="selectedEvents"
          :format-date="formatSelectedDate"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.calendar-layout {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1.25rem 1rem;
  width: 100%;
  max-width: 72rem;
}

@media (min-width: 1024px) {
  .calendar-layout {
    flex-direction: row;
    padding: 1.5rem;
  }
}

.calendar-card {
  flex: 1;
  background: #fff;
  border: 1px solid #e8ddd0;
  border-radius: 1.25rem;
  padding: 1.25rem;
  min-width: 0;
}

@media (min-width: 640px) {
  .calendar-card {
    padding: 1.5rem;
  }
}

.details-card {
  background: #fff;
  border: 1px solid #e8ddd0;
  border-radius: 1.25rem;
  padding: 1.25rem;
  width: 100%;
}

@media (min-width: 1024px) {
  .details-card {
    width: 20rem;
    flex-shrink: 0;
  }
}
</style>
