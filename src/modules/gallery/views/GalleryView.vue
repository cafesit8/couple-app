<script lang="ts" setup>
import { ref } from "vue"
import type { Photo } from "../types"
import { photos } from "../data/photos"
import GalleryHeader from "../components/GalleryHeader.vue"
import PhotoGrid from "../components/PhotoGrid.vue"
import PhotoModal from "../components/PhotoModal.vue"

const selectedPhoto = ref<Photo | null>(null)

function openPhoto(photo: Photo) {
  selectedPhoto.value = photo
}

function closePhoto() {
  selectedPhoto.value = null
}
</script>

<template>
  <div class="w-full h-full flex flex-col items-center overflow-auto">
    <section class="max-w-6xl w-full px-4 md:px-8 py-6 md:py-10 lg:pb-6 pb-20">
      <GalleryHeader />
      <PhotoGrid :photos="photos" @select="openPhoto" />
    </section>

    <PhotoModal :photo="selectedPhoto" @close="closePhoto" />
  </div>
</template>
