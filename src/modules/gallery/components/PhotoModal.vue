<script lang="ts" setup>
import type { Photo } from "../types"

const props = defineProps<{
  photo: Photo | null
}>()

const emit = defineEmits<{
  close: []
}>()

function onBackdropClick(e: MouseEvent) {
  if (e.target === e.currentTarget) emit("close")
}
</script>

<template>
  <Teleport to="body">
    <Transition name="modal">
      <div v-if="photo" class="modal-backdrop" @click="onBackdropClick">
        <div class="modal-content" @click.stop>
          <button
            class="absolute top-3 right-3 z-10 bg-white/80 backdrop-blur-sm rounded-full p-1.5 hover:bg-white transition-colors cursor-pointer"
            @click="emit('close')"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="size-5 text-[#2c2c2c]"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clip-rule="evenodd"
              />
            </svg>
          </button>

          <img :src="photo.src" :alt="photo.titulo" class="modal-image" />

          <div class="p-4 md:p-5">
            <h3 class="text-base md:text-lg font-semibold text-[#2c2c2c]">
              {{ photo.titulo }}, {{ photo.fecha }}
            </h3>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.modal-backdrop {
  position: fixed;
  inset: 0;
  z-index: 50;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(4px);
  padding: 1rem;
}

.modal-content {
  position: relative;
  background: #fff;
  border-radius: 1rem;
  overflow: hidden;
  max-width: 480px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 25px 60px rgba(0, 0, 0, 0.3);
}

.modal-image {
  width: 100%;
  display: block;
  max-height: 60vh;
  object-fit: cover;
}

/* Transitions */
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.25s ease;
}
.modal-enter-active .modal-content,
.modal-leave-active .modal-content {
  transition: transform 0.25s ease, opacity 0.25s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}
.modal-enter-from .modal-content,
.modal-leave-to .modal-content {
  transform: scale(0.95);
  opacity: 0;
}
</style>
