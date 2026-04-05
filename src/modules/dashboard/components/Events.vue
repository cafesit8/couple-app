<script setup lang="ts">
import { useCalendarStore } from '@/store'
import { computed } from 'vue'

const calendarStore = useCalendarStore()
const events = computed(() => calendarStore.events)

function formatDate(dateTime: string) {
  return new Date(dateTime).toLocaleDateString('es-PE', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}
</script>

<template>
  <article class="bg-[#d4d1ec] rounded-3xl p-4 md:p-6 flex flex-col gap-4">
    <h3 class="text-xl md:text-2xl font-semibold">Momentos por vivir</h3>
    <ul v-if="events.length" class="flex flex-col gap-2 flex-1 overflow-auto">
      <li
        v-for="event in events"
        :key="event.id"
        class="bg-[#fbf8f3] rounded-2xl px-4 py-3 flex items-start gap-3 shadow-sm"
      >
        <div class="shrink-0 w-2 h-2 rounded-full bg-[#dc9d8d] mt-1.5" />
        <div class="flex flex-col min-w-0">
          <span class="text-xs font-semibold text-[#9b8ea8] uppercase tracking-wide">
            {{ formatDate(event.start?.dateTime ?? '') }}
          </span>
          <span class="text-sm text-gray-700 truncate">{{ event.summary }}</span>
        </div>
      </li>
    </ul>
    <div
      v-else
      class="flex-1 flex flex-col items-center justify-center gap-2 py-6 text-center"
    >
      <span class="text-3xl">🗓️</span>
      <p class="text-sm font-medium text-[#6b5f7a]">Aún no hay momentos creados</p>
      <p class="text-xs text-[#9b8ea8]">Los eventos que agregues aparecerán aquí</p>
    </div>

    <button
      class="bg-[#dc9d8d] hover:bg-[#dc9d8d]/90 cursor-pointer w-full py-2 rounded-full text-sm md:text-base text-white transition-colors"
      @click="$router.push('/calendar')"
    >
      Ir a eventos
    </button>
  </article>
</template>