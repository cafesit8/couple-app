import { onMounted, ref } from "vue";
import type { CalendarDay, CalendarEvent, EventForm } from "../types"
import { useStorage } from "@vueuse/core";
import googleCalendarApi from "@/api/google";
import { push } from 'notivue'
import { getRandomColorId } from "../utils/calendar";
import { useErrors } from "@/composables/useErrors";
import type { AxiosError } from "axios";
import { useCalendarStore } from "@/store";

export function useCalendar() {
  const isLoading = ref(false)
  const dateSelected = ref<CalendarDay | null>(null)
  const events = ref<CalendarEvent[]>([])
  const eventSelected = ref<CalendarEvent | null>(null)
  const googleToken = useStorage<string | null>('google_access_token', null);
  const sharedCalendarId = useStorage<string | null>('shared_calendar_id', null);
  const {notification} = useErrors();
  const calendarStore = useCalendarStore()

  function getSelectedDate(date: CalendarDay, event: CalendarEvent | null) {
    dateSelected.value = date;
    eventSelected.value = event;
  }

  function deleteEventSelected() {
    eventSelected.value = null;
  }

  async function createEvent(form: EventForm) {
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
    } catch (error: unknown) {
      if (error instanceof Error) {
        notification(error as AxiosError);
      }
    } finally {
      isLoading.value = false;
    }
  }

  async function updateEvent(form: EventForm) {
    if (!dateSelected.value || !sharedCalendarId.value || !eventSelected.value) return;

    try {
      isLoading.value = true;
      const [hours, minutes] = form.time.split(':').map(Number);
      const startDate = new Date(dateSelected.value.date);
      startDate.setHours(hours!, minutes, 0, 0);
      const endDate = new Date(startDate.getTime() + 60 * 60 * 1000);

      const eventPayload = {
        summary: form.title,
        description: form.description,
        start: {
          dateTime: startDate.toISOString(),
        },
        end: {
          dateTime: endDate.toISOString(),
        },
      };

      const response = await googleCalendarApi.patch(
        `/calendars/${sharedCalendarId.value}/events/${eventSelected.value?.id}`,
        eventPayload
      );

      if (response.status !== 200) {
        push.error('Error al actualizar el evento');
        return;
      }
      push.success('Evento actualizado');
      getMemories();
    } catch (error) {
      if (error instanceof Error) {
        notification(error as AxiosError);
      }
    } finally {
      isLoading.value = false;
    }
  }

  async function deleteEvent() {
    if (!sharedCalendarId.value || sharedCalendarId.value === 'not found' || !eventSelected.value) return;

    try {
      isLoading.value = true;

      const response = await googleCalendarApi.delete(
        `/calendars/${sharedCalendarId.value}/events/${eventSelected.value?.id}`
      );

      if (response.status !== 204) {
        push.error('Error al eliminar el evento');
        return;
      }

      push.success('Evento eliminado');
      eventSelected.value = null;
      getMemories();
    } catch (error) {
      console.error("Error al eliminar el evento:", error);
      alert("No se pudo eliminar el recuerdo. Inténtalo de nuevo.");
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
    if (!googleToken.value || !sharedCalendarId.value || sharedCalendarId.value === 'not found') {
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
      calendarStore.addEvent(response.data.items)
    } catch (error) {
      push.error("Error al cargar los recuerdos");
      throw error;
    }
  }

  onMounted(() => {
    if (googleToken.value && sharedCalendarId.value) {
      getMemories();
    }
  });

  return {
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
  }
}
