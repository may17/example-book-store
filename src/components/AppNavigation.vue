<script setup lang="ts">
const appName = 'bookstore'
</script>

<template>
  <nav>
    <ul>
      <li>
        <strong>{{ appName.toUpperCase() }}</strong>
      </li>
    </ul>
    <ul>
      <li><a href="#">Home</a></li>
      <li><a href="#">Books</a></li>
    </ul>
  </nav>
</template>
