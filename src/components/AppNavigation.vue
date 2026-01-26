<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { ref } from 'vue'

type NavigationItem = {
  label: string
  link: string
}

const appName = 'bookstore'

const navigationItems = ref<NavigationItem[]>([
  {
    label: 'Books',
    link: 'books',
  },
  {
    label: 'About',
    link: 'about',
  },
])
</script>

<template>
  <nav>
    <ul>
      <li>
        <strong>{{ appName.toUpperCase() }}</strong>
      </li>
    </ul>
    <ul>
      <li v-for="navigationItem in navigationItems" :key="navigationItem.label">
        <RouterLink :to="{ name: navigationItem.link }">{{ navigationItem.label }}</RouterLink>
      </li>
    </ul>
  </nav>
</template>

<style scoped>
.router-link-active {
  color: var(--pico-contrast)
}
</style>
