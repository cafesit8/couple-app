<script lang="ts" setup>
import type { Photo } from '../types'
import PhotoCard from './PhotoCard.vue'

defineProps<{
  photos: Photo[]
}>()

const emit = defineEmits<{
  select: [photo: Photo]
}>()
</script>

<template>
  <div class="masonry-grid">
    <PhotoCard
      v-for="photo in photos"
      :key="photo.id"
      :photo="photo"
      class="masonry-item"
      @select="emit('select', $event)"
    />
  </div>
</template>

<style scoped>
.masonry-grid {
  columns: 2;
  column-gap: 1rem;
}

.masonry-item {
  break-inside: avoid;
  margin-bottom: 1rem;
}

@media (min-width: 768px) {
  .masonry-grid {
    columns: 3;
  }
}

@media (min-width: 1280px) {
  .masonry-grid {
    columns: 4;
  }
}
</style>
