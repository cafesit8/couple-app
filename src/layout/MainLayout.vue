<script lang="ts" setup>
import Navigation from "@/components/Navigation.vue"
</script>

<template>
  <main class="h-dvh w-full flex flex-col relative bg-[#fbf8f3]">
    <div class="flex-1 w-full relative overflow-auto h-full overflow-y-auto">
      <slot />
    </div>
    <Navigation />
  </main>
</template>
