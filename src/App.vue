<script setup lang="ts">
import MainLayout from './layout/MainLayout.vue';
import { Notivue, Notification } from 'notivue'
import { pastelTheme } from 'notivue'
</script>

<template>
  <MainLayout>
    <Notivue v-slot="item">
      <Notification :item="item" :theme="pastelTheme" />
    </Notivue>
    <router-view />
  </MainLayout>
</template>

<style lang="css">
</style>
