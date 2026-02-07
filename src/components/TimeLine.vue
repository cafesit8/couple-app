<script setup lang="ts">
import { computed, ref } from 'vue'

type TimelineItem = {
  image: string
  date: string
  description: string
}

const props = defineProps<{
  items: TimelineItem[]
}>()

const imageOrientations = ref<{ [key: string]: 'horizontal' | 'vertical' }>({})

const sortedItems = computed(() =>
  [...props.items].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  )
)

const formatDate = (date: string) =>
  new Intl.DateTimeFormat('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(new Date(date))

const checkImageOrientation = (src: string, event: Event) => {
  const img = event.target as HTMLImageElement
  const isHorizontal = img.width > img.height
  imageOrientations.value[src] = isHorizontal ? 'horizontal' : 'vertical'
}

const getObjectClass = (src: string) => {
  return imageOrientations.value[src] === 'horizontal' 
    ? 'h-full object-cover' 
    : 'h-32 object-contain'
}
</script>

<template>
  <div class="relative mx-auto max-w-5xl overflow-auto">
    <!-- línea central -->
    <div class="absolute left-1/2 top-0 h-full w-px bg-[#dc9d8d] -translate-x-1/2"></div>

    <div
      v-for="(item, index) in sortedItems"
      :key="index"
      class="timeline-item"
      :class="index % 2 === 0 ? 'left' : 'right'"
    >

      <!-- card -->
      <article class="card animate-on-scroll">
        <picture class="overflow-hidden h-36 rounded-lg flex items-center justify-center bg-gray-100">
          <img
            :src="item.image"
            alt=""
            :class="getObjectClass(item.image)"
            class="w-full"
            @load="checkImageOrientation(item.image, $event)"
          />
        </picture>

        <p class="text-xs text-neutral-500 mb-1">
          {{ formatDate(item.date) }}
        </p>

        <p class="text-neutral-800 text-xs">
          {{ item.description }}
        </p>
      </article>
    </div>
  </div>
</template>

<style scoped>
/* estructura */
.timeline-item {
  position: relative;
  display: flex;
  width: 100%;
  margin-bottom: 0rem;
}

.timeline-item.left {
  justify-content: flex-end;
  padding-right: 0rem;
}

.timeline-item.left .card::after {
  content: '';
  position: absolute;
  top: 50%;
  right: 100%;
  transform: translateY(-50%);
  width: 0;
  height: 0;
  border-top: 10px solid transparent;
  border-bottom: 10px solid transparent;
  border-right: 12px solid white;
}

.timeline-item.right {
  justify-content: flex-start;
  padding-left: 0rem;
}

.timeline-item.right .card::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 100%;
  transform: translateY(-50%);
  width: 0;
  height: 0;
  border-top: 10px solid transparent;
  border-bottom: 10px solid transparent;
  border-left: 12px solid white;
}
/* card */
.card {
  width: 17rem;
  background: white;
  border-radius: 1rem;
  padding: 0.5rem;
  box-shadow: 0 10px 25px -10px rgb(0 0 0 / 0.15);
}

/* 🔥 animación al hacer scroll */
.animate-on-scroll {
  opacity: 0;
  transform: translateY(40px) scale(0.96);
  animation: reveal linear forwards;
  animation-timeline: view();
  animation-range: entry 15% cover 25%;
}

@keyframes reveal {
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

/* accesibilidad */
@media (prefers-reduced-motion: reduce) {
  .animate-on-scroll {
    animation: none;
    opacity: 1;
    transform: none;
  }
}
</style>
