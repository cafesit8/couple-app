import axios from 'axios';

const googleCalendarApi = axios.create({
  baseURL: 'https://www.googleapis.com/calendar/v3',
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
  (error) => {
    if (error.response?.status === 401) {
      console.error("El token ha expirado o es inválido.");
      localStorage.removeItem('google_access_token');
    }
    return Promise.reject(error);
  }
);

export default googleCalendarApi;