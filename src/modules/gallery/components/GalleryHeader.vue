<script lang="ts" setup></script>

<template>
  <header
    class="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6"
  >
    <div>
      <h1
        class="gallery-title text-2xl sm:text-3xl md:text-4xl font-semibold text-[#2c2c2c]"
      >
        Galería de Recuerdos
      </h1>
      <p class="text-sm md:text-base text-[#6b6b6b] mt-1">
        Una colección de nuestros momentos compartidos.
      </p>
    </div>
    <button
      class="bg-[#c4944a] hover:bg-[#b0843f] text-white text-sm font-medium py-2.5 px-5 rounded-full cursor-pointer flex items-center gap-1 transition-colors shrink-0 self-start sm:self-auto"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="size-4"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
        />
      </svg>
      Agregar foto
    </button>
  </header>
</template>

<style scoped>
.gallery-title {
  font-family: "Lora Variable", serif;
}
</style>
