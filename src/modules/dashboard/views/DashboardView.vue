<script lang="ts" setup>
import Header from '../components/HeaderDashboard.vue';
import Memories from '../components/Memories.vue';
import TimeLine from '../components/TimeLine.vue';

</script>

<template>
  <div class="w-full h-full flex flex-col items-center">
    <Header />
    <section class="max-w-7xl w-full grid grid-cols-2 grid-rows-2 gap-4 flex-1 pb-6 overflow-auto py-6">
      <TimeLine />
      <Memories />
      <article class="bg-[#d4d1ec] rounded-3xl p-6 flex flex-col gap-4">
        <h3 class="text-2xl font-semibold line-clamp-none">Momentos por vivir</h3>
        <div class="flex flex-col gap-2 flex-1 overflow-auto">
          <article class="bg-[#fbf8f3] rounded-full p-2 px-4 flex items-center">
            <span>
              <strong>Nov 15, 2026:</strong>
              Noche de cena, salida para conocernos
            </span>
          </article>
          <article class="bg-[#fbf8f3] rounded-full p-2 px-4 flex items-center">
            <span>
              <strong>Nov 15, 2026:</strong>
              Noche de cena, salida para conocernos
            </span>
          </article>
          <article class="bg-[#fbf8f3] rounded-full p-2 px-4 flex items-center">
            <span>
              <strong>Nov 15, 2026:</strong>
              Noche de cena, salida para conocernos
            </span>
          </article>
          <article class="bg-[#fbf8f3] rounded-full p-2 px-4 flex items-center">
            <span>
              <strong>Nov 15, 2026:</strong>
              Noche de cena, salida para conocernos
            </span>
          </article>
          <article class="bg-[#fbf8f3] rounded-full p-2 px-4 flex items-center">
            <span>
              <strong>Nov 15, 2026:</strong>
              Noche de cena, salida para conocernos
            </span>
          </article>
          <article class="bg-[#fbf8f3] rounded-full p-2 px-4 flex items-center">
            <span>
              <strong>Nov 15, 2026:</strong>
              Noche de cena, salida para conocernos
            </span>
          </article>
        </div>
        <div class="flex gap-2.5 text-white">
          <button class="bg-[#dc9d8d] hover:bg-[#dc9d8d]/90 cursor-pointer w-full py-2 rounded-full">Ver más eventos</button>
          <button class="bg-[#dc9d8d] hover:bg-[#dc9d8d]/90 cursor-pointer w-full py-2 rounded-full flex items-center justify-center gap-1.5">
            <img src="@/assets/icons/google-calendar.png" alt="imagen de google calendar" class="size-5" />
            Sincronizar
          </button>
        </div>
      </article>
    </section>
  </div>
</template>