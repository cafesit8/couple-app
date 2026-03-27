import type { CalendarEvent } from '../types'

const now = new Date()
const y = now.getFullYear()
const m = now.getMonth()

function d(day: number): string {
  return `${y}-${String(m + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
}

export const calendarEvents: CalendarEvent[] = [
  {
    id: 1,
    titulo: 'Noche de Películas',
    fecha: d(3),
    hora: '8:00 PM',
    ubicacion: 'Casa',
    imagen: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=200&h=200&fit=crop',
    favorito: false,
    recordatorio: '30 minutos antes',
  },
  {
    id: 2,
    titulo: 'Cena con Amigos',
    fecha: d(5),
    hora: '7:00 PM',
    ubicacion: 'Restaurante La Terraza',
    imagen: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=200&h=200&fit=crop',
    favorito: false,
    recordatorio: '1 hora antes',
  },
  {
    id: 3,
    titulo: 'Día de Fotos',
    fecha: d(7),
    hora: '4:00 PM',
    ubicacion: 'Parque Central',
    imagen: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&h=200&fit=crop',
    favorito: false,
    recordatorio: '2 horas antes',
  },
  {
    id: 4,
    titulo: 'Paseo en la Ciudad',
    fecha: d(8),
    hora: '11:00 AM',
    ubicacion: 'Centro Histórico',
    imagen: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=200&h=200&fit=crop',
    favorito: false,
    recordatorio: '1 hora antes',
  },
  {
    id: 5,
    titulo: 'Cena Romántica',
    fecha: d(12),
    hora: '7:30 PM',
    ubicacion: 'El Rincón Acogedor',
    imagen: '',
    favorito: true,
    recordatorio: '1 hora antes',
  },
  {
    id: 6,
    titulo: 'Escapada de Fin de Semana',
    fecha: d(15),
    hora: '9:00 AM',
    ubicacion: 'Cabaña del Lago',
    imagen: 'https://images.unsplash.com/photo-1501901609772-df0848060b33?w=200&h=200&fit=crop',
    favorito: true,
    recordatorio: '1 día antes',
  },
  {
    id: 7,
    titulo: 'Concierto',
    fecha: d(22),
    hora: '8:30 PM',
    ubicacion: 'Arena Musical',
    imagen: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=200&h=200&fit=crop',
    favorito: false,
    recordatorio: '3 horas antes',
  },
  {
    id: 8,
    titulo: 'Picnic en la Playa',
    fecha: d(28),
    hora: '11:00 AM',
    ubicacion: 'Playa Serena',
    imagen: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=200&h=200&fit=crop',
    favorito: true,
    recordatorio: '1 hora antes',
  },
]
