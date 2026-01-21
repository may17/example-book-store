<script setup lang="ts">
import { ref } from 'vue'

type NavigationItem = {
  label: string
  link: string
}

const appName = 'bookstore'

const navigationItems = ref<NavigationItem[]>([
  {
    label: 'Home',
    link: '#',
  },
  {
    label: 'Books',
    link: '#',
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
        <a :href="navigationItem.link">{{ navigationItem.label }}</a>
      </li>
    </ul>
  </nav>
</template>
