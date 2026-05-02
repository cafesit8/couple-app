import { GOOGLE_CALENDAR_API_BASE } from '@/constants/google';
import axios from 'axios';

const googleCalendarApi = axios.create({
  baseURL: GOOGLE_CALENDAR_API_BASE,
});

googleCalendarApi.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('google_access_token');

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

googleCalendarApi.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      const { useCalendar } = await import('@/modules/calendar/composables/useCalendar');
      const { logout } = useCalendar();
      await logout();
    }
    return Promise.reject(error);
  }
);

export default googleCalendarApi;