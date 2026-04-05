<script lang="ts" setup>
import { useCalendar } from '../composables/useCalendar'
import CalendarGrid from '../components/CalendarGrid.vue'
import EventPanel from '../components/EventPanel.vue'

const {
  getSelectedDate,
  createEvent,
  getOrCreateSharedCalendarId,
  updateEvent,
  deleteEventSelected,
  deleteEvent,
  dateSelected,
  events,
  eventSelected,
  isLoading
} = useCalendar()
</script>

<template>
  <div class="w-full h-full flex justify-center overflow-auto" v-auto-animate>
    <div class="calendar-layout">
      <div class="calendar-card">
        <CalendarGrid
          :date-selected="dateSelected"
          :events="events"
          @selectDate="getSelectedDate"
        />
      </div>
      <div class="details-card" v-auto-animate>
        <EventPanel 
          :selected-date="dateSelected" 
          :event-selected="eventSelected"
          :is-loading="isLoading"
          @createEvent="createEvent" 
          @updateEvent="updateEvent"
          @deleteEvent="deleteEvent"
          @deleteEventSelected="deleteEventSelected"
          @getOrCreateSharedCalendarId="getOrCreateSharedCalendarId"
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
  overflow-y: auto;
  padding-bottom: 80px;
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
  height: 100%;
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
