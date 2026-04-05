import { createApp } from 'vue'
import App from './App.vue'
import { router } from './router'
import { createNotivue } from 'notivue'
import GoogleSignInPlugin from "vue3-google-signin"
import { autoAnimatePlugin } from '@formkit/auto-animate/vue'
import { createPinia } from 'pinia'
import 'notivue/notification.css'
import 'notivue/animations.css'
import './style.css'

const pinia = createPinia()
const app = createApp(App)
const notivue = createNotivue({
  position: 'top-center',
  notifications: {
    global: {
      duration: 5000
    }
  }
})

app.use(GoogleSignInPlugin, {
  clientId: import.meta.env.VITE_GOOGLE_CLIENT_ID,
  scope: 'https://www.googleapis.com/auth/calendar'
});
app.use(pinia)
app.use(autoAnimatePlugin)
app.use(router)
app.use(notivue)
app.mount('#app')
