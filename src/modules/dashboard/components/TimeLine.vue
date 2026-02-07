<script lang="ts" setup>
import TimeLine from '@/components/TimeLine.vue';
import us from '@/assets/us.webp';
import rings from '@/assets/rings.png';

const timelineItems = [
  {
    image: us,
    date: '2023-10-26',
    description: 'Our First Anniversary trip to Maui! Best sunset ever 💕'
  },
  {
    image: rings,
    date: '2023-10-14',
    description: 'Trying the new pasta recipe. It was delicious!'
  },
  {
    image: 'https://www.atptour.com/-/media/images/news/2026/01/30/16/50/djokovic-australian-open-2026-reaction-friday.jpg',
    date: '2023-09-05',
    description: 'The Lumineers concert in Denver. What a night 🎶'
  }
]
</script>
<template>
  <article class="row-span-2 bg-[#f2d7d0] rounded-3xl p-6 overflow-auto flex flex-col gap-6">
    <header class="flex flex-col gap-2">
      <h3 class="text-2xl font-semibold line-clamp-none">Nuestra Línea del Tiempo</h3>
      <button
        class="bg-[#dc9d8d] py-2 w-full rounded-full cursor-pointer text-white flex justify-center items-center gap-1.5 hover:bg-[#dc9d8d]/90">
        <img src="@/assets/icons/plus.svg" alt="imagen de suma" class="size-6" />
        <span>Nueva memoría</span>
      </button>
    </header>
    <main>
      <TimeLine :items="timelineItems" />
    </main>
  </article>
</template>
<style lang="css" scoped>

</style>