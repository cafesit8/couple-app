<script lang="ts" setup>
import { defineAsyncComponent } from "vue";

const Events = defineAsyncComponent(() => import("../components/Events.vue"));
const Header = defineAsyncComponent(() => import("../components/HeaderDashboard.vue"));
const Memories = defineAsyncComponent(() => import("../components/Memories.vue"));
const TimeLine = defineAsyncComponent(() => import("../components/TimeLine.vue"));
</script>

<template>
  <div class="w-full h-full flex flex-col items-center">
    <Header />
    <section
      class="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 xl:grid-rows-2 gap-4 flex-1 overflow-auto py-6 px-4 md:px-6 lg:pb-6 pb-20"
    >
      <TimeLine />
      <Memories />
      <Events />
    </section>
  </div>
</template>
