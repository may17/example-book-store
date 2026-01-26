<script setup lang="ts">
defineProps<{
  title: string
  isbn: string
  numPages?: number
  cover?: string
  isFavorite?: boolean
}>()

defineEmits<{
  'toggle-favorite': []
}>()
</script>

<template>
  <tr>
    <td style="width: 10%"><img :src="cover" :alt="title" style="max-height: 60px" /></td>
    <td style="width: 45%">{{ title }} <span v-if="isFavorite">⭐</span></td>
    <td style="width: 30%">{{ isbn }}</td>
    <td style="width: 15%">
      <button @click="$emit('toggle-favorite')">
        {{ isFavorite ? 'Remove' : 'Add' }}
      </button>
    </td>
  </tr>
</template>
