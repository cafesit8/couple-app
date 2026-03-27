export interface CalendarEvent {
  id: number
  titulo: string
  fecha: string
  hora: string
  ubicacion: string
  imagen: string
  favorito: boolean
  recordatorio: string
}

export interface CalendarDay {
  day: number
  date: Date
  currentMonth: boolean
}
