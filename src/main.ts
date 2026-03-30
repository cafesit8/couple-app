import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { router } from './router'
import { createNotivue } from 'notivue'
import GoogleSignInPlugin from "vue3-google-signin"
import 'notivue/notification.css'
import 'notivue/animations.css'


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
app.use(router)
app.use(notivue)
app.mount('#app')
