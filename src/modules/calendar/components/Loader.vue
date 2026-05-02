<template>
  <div class="loader-root">
    <svg class="loader-icon" viewBox="0 0 50 50" aria-hidden="true">
      <circle class="loader-track" cx="25" cy="25" r="20" />
      <circle class="loader-head" cx="25" cy="25" r="20" />
    </svg>
    <span class="loader-label">Cargando calendario...</span>
  </div>
</template>

<script setup lang="ts">
</script>

<style scoped>
.loader-root {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  min-height: 130px;
  padding: 1rem;
  color: #c4944a;
}

.loader-icon {
  width: 36px;
  height: 36px;
}

.loader-track {
  fill: none;
  stroke: rgba(196, 148, 74, 0.18);
  stroke-width: 5;
}

.loader-head {
  fill: none;
  stroke: #c4944a;
  stroke-width: 5;
  stroke-linecap: round;
  stroke-dasharray: 120;
  stroke-dashoffset: 90;
  animation: rotate-360 1s linear infinite;
}

@keyframes rotate-360 {
  100% {
    transform: rotate(360deg);
  }
}

.loader-label {
  font-size: 0.95rem;
  font-weight: 600;
}
</style>
