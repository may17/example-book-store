<script setup lang="ts">
import { RouterLink } from 'vue-router'

const props = defineProps<{
  title: string
  isbn: string
  numPages?: number
  cover?: string
  isFavorite?: boolean
}>()

const emit = defineEmits<{
  'toggle-favorite': []
}>()
</script>

<template>
  <tr>
    <td style="width: 10%">
      <img :src="props.cover" :alt="props.title" style="max-height: 60px" />
    </td>
    <td style="width: 45%">
      {{ props.title }}
      <span v-if="props.isFavorite">⭐</span>
    </td>
    <td style="width: 30%">
      <RouterLink :to="{ name: 'book-detail', params: { isbn: props.isbn } }">
        {{ props.isbn }}
      </RouterLink>
    </td>
    <td style="width: 15%">
      <button @click="emit('toggle-favorite')">
        {{ props.isFavorite ? 'Remove' : 'Add' }}
      </button>
    </td>
  </tr>
</template>
