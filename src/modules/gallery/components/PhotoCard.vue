<script lang="ts" setup>
import type { Photo } from "../types"

defineProps<{
  photo: Photo
}>()

const emit = defineEmits<{
  select: [photo: Photo]
}>()
</script>

<template>
  <article
    class="photo-card group cursor-pointer"
    @click="emit('select', photo)"
  >
    <div class="relative overflow-hidden rounded-2xl">
      <img
        :src="photo.src"
        :alt="photo.titulo"
        class="w-full block rounded-2xl transition-transform duration-300 group-hover:scale-105"
        loading="lazy"
      />
    </div>
    <div class="mt-2 px-0.5">
      <h4 class="text-sm font-semibold text-[#2c2c2c] leading-tight">
        {{ photo.titulo }}
      </h4>
      <span class="text-xs text-[#8a8a8a]">{{ photo.fecha }}</span>
    </div>
  </article>
</template>

<style scoped>
.photo-card {
  break-inside: avoid;
}
</style>
