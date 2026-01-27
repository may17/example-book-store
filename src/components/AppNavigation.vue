<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { computed } from 'vue'
import { useBookStore } from '../stores/books'

type NavigationItem = {
  label: string
  link: string
}

const appName = 'bookstore'
const store = useBookStore()

const navigationItems = computed<NavigationItem[]>(() => [
  {
    label: `Books (${store.totalBooks})`,
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
        <RouterLink :to="{ name: navigationItem.link }">
          {{ navigationItem.label }}
        </RouterLink>
      </li>
    </ul>
  </nav>
</template>

<style scoped>
.router-link-active {
  color: var(--pico-contrast)
}
</style>
