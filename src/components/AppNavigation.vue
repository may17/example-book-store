<script setup lang="ts">
import { ref } from 'vue'

type NavigationItem = {
  label: string
  to: string
}

const appName = 'bookstore'

const navigationItems = ref<NavigationItem[]>([
  {
    label: 'Home',
    to: 'home',
  },
  {
    label: 'About',
    to: 'about',
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
        <RouterLink :to="{ name: navigationItem.to }">{{ navigationItem.label }}</RouterLink>
      </li>
    </ul>
  </nav>
</template>
