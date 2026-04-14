<script lang="ts" setup>
import { ref } from "vue"
import type { Photo } from "../types"
import { photos } from "../data/photos"
import GalleryHeader from "../components/GalleryHeader.vue"
import PhotoGrid from "../components/PhotoGrid.vue"
import PhotoModal from "../components/PhotoModal.vue"

const selectedPhoto = ref<Photo | null>(null)
const working = ref(false)

function openPhoto(photo: Photo) {
  selectedPhoto.value = photo
}

function closePhoto() {
  selectedPhoto.value = null
}
</script>

<template>
  <div class="w-full h-full flex flex-col items-center">
    <section class="max-w-6xl w-full px-4 md:px-8 py-6 md:py-10 lg:pb-6 pb-20">
      <GalleryHeader />
      <PhotoGrid v-if="working" :photos="photos" @select="openPhoto" />
      <div v-else class="flex flex-col items-center justify-center py-24 gap-2 text-center">
        <p class="text-lg font-semibold text-gray-700 dark:text-gray-300">Muy pronto</p>
        <p class="text-sm text-gray-400">Estamos trabajando en algo increíble</p>
      </div>
    </section>

    <PhotoModal :photo="selectedPhoto" @close="closePhoto" />
  </div>
</template>
