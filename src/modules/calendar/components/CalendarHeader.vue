<script lang="ts" setup>
defineProps<{
  monthLabel: string
}>()

const emit = defineEmits<{
  prev: []
  next: []
}>()

const views = ['Mes', 'Semana', 'Día']
const activeView = 'Mes'
</script>

<template>
  <header class="flex items-center justify-between mb-4 px-1">
    <div class="flex items-center gap-2">
      <button
        class="calendar-nav-btn"
        @click="emit('prev')"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="size-5" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd" />
        </svg>
      </button>
      <h2 class="calendar-month-label">{{ monthLabel }}</h2>
      <button
        class="calendar-nav-btn"
        @click="emit('next')"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="size-5" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
        </svg>
      </button>
    </div>

    <div class="flex rounded-lg overflow-hidden border border-[#d5c6b3]">
      <button
        v-for="view in views"
        :key="view"
        class="calendar-view-btn"
        :class="{ active: view === activeView }"
      >
        {{ view }}
      </button>
    </div>
  </header>
</template>

<style scoped>
.calendar-month-label {
  font-family: 'Lora Variable', serif;
  font-size: 1.25rem;
  font-weight: 600;
  color: #2c2c2c;
  min-width: 10rem;
  text-align: center;
}

@media (min-width: 640px) {
  .calendar-month-label {
    font-size: 1.5rem;
  }
}

.calendar-nav-btn {
  color: #8a7a6b;
  padding: 0.25rem;
  border-radius: 0.375rem;
  cursor: pointer;
  transition: color 0.15s;
}
.calendar-nav-btn:hover {
  color: #2c2c2c;
}

.calendar-view-btn {
  padding: 0.35rem 0.85rem;
  font-size: 0.8rem;
  font-weight: 500;
  color: #8a7a6b;
  background: transparent;
  cursor: pointer;
  transition: all 0.15s;
}
.calendar-view-btn.active {
  background: #f2d7d0;
  color: #2c2c2c;
}
.calendar-view-btn:hover:not(.active) {
  background: #faf5f0;
}
</style>
