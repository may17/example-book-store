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
      <li>
        <a href="#">{{ navigationItems[0].label }}</a>
      </li>
      <li>
        <a href="#">{{ navigationItems[1].label }}</a>
      </li>
    </ul>
  </nav>
</template>
