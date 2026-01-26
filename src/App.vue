<script setup lang="ts">
import AppNavigation from './components/AppNavigation.vue'
</script>

<template>
  <div class="container">
    <AppNavigation />
    <main>
      <router-view />
    </main>
  </div>
</template>
