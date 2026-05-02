import { createWebHistory, createRouter } from 'vue-router'

const routes = [
  { path: '/', component: () => import('@/modules/dashboard/views/DashboardView.vue') },
  { path: '/gallery', component: () => import('@/modules/gallery/views/GalleryView.vue') },
  { path: '/calendar', component: () => import('@/modules/calendar/views/CalendarView.vue') },
  { path: '/:pathMatch(.*)*', redirect: '/' },
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})