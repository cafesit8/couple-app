import { onMounted, ref } from "vue";
import type { CalendarDay, CalendarEvent } from "../types"
import { useStorage } from "@vueuse/core";
import googleCalendarApi from "@/api/google";
import { push } from 'notivue'
import { getRandomColorId } from "../utils/calendar";

export function useCalendar() {
  const isLoading = ref(false)
  const dateSelected = ref<CalendarDay | null>(null)
  const events = ref<CalendarEvent[]>([])
  const eventSelected = ref<CalendarEvent | null>(null)
  const sharedCalendarId = useStorage<string | null>('shared_calendar_id', null);

  function getSelectedDate(date: CalendarDay, event: CalendarEvent | null) {
    dateSelected.value = date;
    eventSelected.value = event;
  }

  async function createEvent(form: { title: string, description: string, time: string }) {
    if (!dateSelected.value) {
      push.warning('No hay fecha seleccionada');
      return;
    }

    if (!sharedCalendarId.value || sharedCalendarId.value === 'not found') return;
    if (isLoading.value) return;

    try {
      isLoading.value = true;
      const [hours, minutes] = form.time.split(':').map(Number);
      
      const startDate = new Date(dateSelected.value.date);
      startDate.setHours(hours!, minutes, 0, 0);

      const endDate = new Date(startDate.getTime() + 60 * 60 * 1000);

      const eventPayload = {
        summary: form.title || "Nuevo Recuerdo ❤️",
        description: form.description,
        start: {
          dateTime: startDate.toISOString(),
          timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        },
        end: {
          dateTime: endDate.toISOString(),
          timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        },
        colorId: getRandomColorId()
      };

      await googleCalendarApi.post(
        `/calendars/${sharedCalendarId.value}/events`, 
        eventPayload
      );
      
      push.success('Recuerdo guardado exitosamente');
      dateSelected.value = null;
      getMemories();
    } catch (error: any) {
      if (error.response?.status === 403) {
        push.error('No tienes permisos para escribir en este calendario');
      } else {
        push.error("Error creando el evento:");
      }
      throw error;
    } finally {
      isLoading.value = false;
    }
  }

  async function getOrCreateSharedCalendarId() {
    try {
      const response = await googleCalendarApi.get('/users/me/calendarList', {
        params: {
          minAccessRole: 'writer',
          showHidden: true,
        }
      });
      const items = response.data.items;
      const sharedCalendar = items.find((cal: any) => cal.summary === 'Memories App ❤️');

      if (sharedCalendar) {
        push.success('Calendario cargado correctamente');
        sharedCalendarId.value = sharedCalendar.id;
        getMemories();
      }
    } catch (error) {
      push.error('Hubo un error al conectar con Google');
      sharedCalendarId.value = 'not found';
    }
  }

  async function getMemories() {
    if (!sharedCalendarId.value || sharedCalendarId.value === 'not found') {
      push.error("Error al cargar los recuerdos");
      return [];
    }

    try {
      const response = await googleCalendarApi.get(
        `/calendars/${sharedCalendarId.value}/events`,
        {
          params: {
            orderBy: 'startTime',
            singleEvents: true,
          }
        }
      );

      events.value = response.data.items;
    } catch (error) {
      console.error("Error al cargar los recuerdos:", error);
      throw error;
    }
  }

  onMounted(() => {
    if (sharedCalendarId) getMemories();
  });

  return {
    getSelectedDate,
    createEvent,
    getOrCreateSharedCalendarId,
    dateSelected,
    events,
    eventSelected,
    isLoading
  }
}
