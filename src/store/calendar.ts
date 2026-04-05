import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { CalendarEvent } from '@/modules/calendar/types'

export const useCalendarStore = defineStore('calendar', () => {
  const events = ref<CalendarEvent[]>([])

  function addEvent(eventList: CalendarEvent[]) {
    events.value = eventList
  }

  return { events, addEvent }
})