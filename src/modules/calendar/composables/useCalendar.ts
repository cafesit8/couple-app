import { ref, computed } from 'vue'
import type { CalendarDay, CalendarEvent } from '../types'

export function useCalendar(events: CalendarEvent[]) {
  const currentDate = ref(new Date())
  const selectedDate = ref<Date | null>(null)

  const year = computed(() => currentDate.value.getFullYear())
  const month = computed(() => currentDate.value.getMonth())

  const monthLabel = computed(() => {
    const label = currentDate.value.toLocaleString('es', { month: 'long', year: 'numeric' })
    return label.charAt(0).toUpperCase() + label.slice(1)
  })

  const weekDays = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom']

  const calendarDays = computed<CalendarDay[]>(() => {
    const days: CalendarDay[] = []
    const daysInMonth = new Date(year.value, month.value + 1, 0).getDate()
    const firstDayWeekday = new Date(year.value, month.value, 1).getDay()
    const startPadding = firstDayWeekday === 0 ? 6 : firstDayWeekday - 1

    const prevMonthDays = new Date(year.value, month.value, 0).getDate()
    for (let i = startPadding - 1; i >= 0; i--) {
      days.push({
        day: prevMonthDays - i,
        date: new Date(year.value, month.value - 1, prevMonthDays - i),
        currentMonth: false,
      })
    }

    for (let i = 1; i <= daysInMonth; i++) {
      days.push({
        day: i,
        date: new Date(year.value, month.value, i),
        currentMonth: true,
      })
    }

    const totalCells = days.length <= 35 ? 35 : 42
    const remaining = totalCells - days.length
    for (let i = 1; i <= remaining; i++) {
      days.push({
        day: i,
        date: new Date(year.value, month.value + 1, i),
        currentMonth: false,
      })
    }

    return days
  })

  function prevMonth() {
    currentDate.value = new Date(year.value, month.value - 1, 1)
  }

  function nextMonth() {
    currentDate.value = new Date(year.value, month.value + 1, 1)
  }

  function selectDate(date: Date) {
    selectedDate.value = date
  }

  function isToday(date: Date): boolean {
    const today = new Date()
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    )
  }

  function isSameDay(a: Date, b: Date): boolean {
    return (
      a.getDate() === b.getDate() &&
      a.getMonth() === b.getMonth() &&
      a.getFullYear() === b.getFullYear()
    )
  }

  function isSelected(date: Date): boolean {
    return selectedDate.value ? isSameDay(date, selectedDate.value) : false
  }

  function getEventsForDate(date: Date): CalendarEvent[] {
    const dateStr = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
    return events.filter((e) => e.fecha === dateStr)
  }

  function formatSelectedDate(date: Date): string {
    return date.toLocaleDateString('es', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  return {
    currentDate,
    selectedDate,
    year,
    month,
    monthLabel,
    weekDays,
    calendarDays,
    prevMonth,
    nextMonth,
    selectDate,
    isToday,
    isSelected,
    getEventsForDate,
    formatSelectedDate,
  }
}
