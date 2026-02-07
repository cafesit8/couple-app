<script lang="ts" setup>
import { computed } from 'vue';

const props = defineProps<{
  src: string
  alt: string
  class: string
  object: 'cover' | 'contain'
}>()

const objectValue = computed(() => props.object === 'cover' ? 'object-cover' : 'object-contain')

const srcUrl = computed(() => new URL(props.src, import.meta.url).href)
</script>
<template>
  <picture class="block size-16 rounded-full overflow-hidden" :class="class">
    <img :src="srcUrl" :alt="alt" class="w-full h-full" :class='objectValue' />
  </picture>
</template>
<style lang="css" scoped></style>