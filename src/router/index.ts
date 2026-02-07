import { createWebHistory, createRouter } from 'vue-router'

import DashboardView from '@/modules/dashboard/views/DashboardView.vue'
import GalleryView from '@/modules/gallery/views/GalleryView.vue'
import CalendarView from '@/modules/calendar/views/CalendarView.vue'

const routes = [
  { path: '/', component: DashboardView },
  { path: '/gallery', component: GalleryView },
  { path: '/calendar', component: CalendarView },
  { path: '/:pathMatch(.*)*', redirect: '/' },
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})