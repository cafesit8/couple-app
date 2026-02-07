<script lang="ts" setup>
</script>
<template>
  <article class="bg-[#d4e1c9] rounded-3xl p-6 flex flex-col gap-4">
    <h3 class="text-2xl font-semibold line-clamp-none">Memorias</h3>
    <div class="flex gap-4 flex-1">
      <article class="bg-[#fbf8f3] w-full flex flex-col justify-center items-center rounded-2xl flex-1 p-4">
        <picture class="block size-24 rounded-full overflow-hidden bg-red-100 p-2">
          <img src="@/assets/icons/letter.webp" alt="imagen de carta" class="w-full h-full object-contain" />
        </picture>
        <h4 class="font-semibold text-center text-sm">Cartas de amor</h4>
        <p class="text-sm">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iure ullam debitis</p>
      </article>
      <article class="bg-[#fbf8f3] w-full flex flex-col justify-center items-center rounded-2xl flex-1 p-4">
        <picture class="block size-24 rounded-full overflow-hidden bg-red-100 p-2">
          <img src="@/assets/icons/heart.png" alt="imagen de carta" class="w-full h-full object-contain" />
        </picture>
        <h4 class="font-semibold text-center text-sm ">Nuestras promesas</h4>
        <p class="text-sm">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iure ullam debitis</p>
      </article>
      <article class="bg-[#fbf8f3] w-full flex flex-col justify-center items-center rounded-2xl flex-1 p-4">
        <picture class="block size-24 rounded-full overflow-hidden bg-red-100 p-2">
          <img src="@/assets/icons/star.png" alt="imagen de carta" class="w-full h-full object-contain" />
        </picture>
        <h4 class="font-semibold text-center text-sm">Ideas para el futuro</h4>
        <p class="text-sm">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iure ullam debitis</p>
      </article>
    </div>
  </article>
</template>
<style lang="css" scoped></style>