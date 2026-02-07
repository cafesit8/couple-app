<script lang="ts" setup>
import { useRoute } from 'vue-router'

const route = useRoute()

const routes = [{
  path: '/',
  icon: new URL('@/assets/icons/home.svg', import.meta.url).href,
  label: 'Inicio',
}, {
  path: '/gallery',
  icon: new URL('@/assets/icons/photo.svg', import.meta.url).href,
  label: 'Galería',
}, {
  path: '/calendar',
  icon: new URL('@/assets/icons/calendar-event.svg', import.meta.url).href,
  label: 'Eventos',
}]

const isActive = (path: string) => route.path === path
</script>
<template>
  <nav class="absolute bottom-2 left-1/2 -translate-x-1/2 bg-[#e1b3ff] rounded-2xl p-2">
    <ul class="flex gap-1.5">
      <li v-for="route in routes" :key="route.path">
        <router-link :to="route.path">
          <div class="flex flex-col items-center justify-center gap-0 py-1 px-3 rounded-md transition-all"
            :class="isActive(route.path) ? 'bg-[#f6e8ff]' : 'bg-transparent'">
            <img :src="route.icon" class="size-5" />
            <span class="text-xs">{{ route.label }}</span>
          </div>
        </router-link>
      </li>
    </ul>
  </nav>
</template>
<style lang="css" scoped></style>