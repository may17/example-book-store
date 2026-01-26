<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import { useRoute, RouterLink } from 'vue-router'
import type { Book } from '../types'

const route = useRoute()
const book = ref<Book | null>(null)
const loading = ref(false)
const error = ref<unknown | null>(null)

const API_URL = 'http://localhost:4730'

const fetchBook = async (isbn: string) => {
  loading.value = true
  error.value = null
  try {
    const response = await fetch(`${API_URL}/books/${isbn}`)
    if (!response.ok) throw new Error(`HTTP ${response.status}`)
    const data = await response.json()
    book.value = data || null
    if (!book.value) {
      error.value = 'Buch nicht gefunden'
    }
  } catch (err) {
    console.error('Error fetching book:', err)
    error.value = err instanceof Error ? err.message : String(err)
  } finally {
    loading.value = false
  }
}

watchEffect(() => {
  const isbn = route.params.isbn as string
  if (isbn) {
    fetchBook(isbn)
  }
})
</script>

<template>
  <div>
    <RouterLink to="/books">← Zurück zu Büchern</RouterLink>

    <p v-if="loading">Lade Buch…</p>
    <p v-if="error">Fehler: {{ error }}</p>

    <div v-if="book">
      <div class="wrapper">
        <div v-if="book.cover" style="flex-shrink: 0;">
          <img :src="book.cover" :alt="book.title" style="max-height: 300px; object-fit: cover;" />
        </div>
        <div>
          <h1>{{ book.title }}</h1>
          <p v-if="book.subtitle"><em>{{ book.subtitle }}</em></p>
          <p><strong>Autor:</strong> {{ book.author }}</p>
          <p><strong>ISBN:</strong> {{ book.isbn }}</p>
          <p><strong>Verlag:</strong> {{ book.publisher }}</p>
          <p><strong>Preis:</strong> {{ book.price }}</p>
          <p v-if="book.numPages"><strong>Seiten:</strong> {{ book.numPages }}</p>
          <p v-if="book.abstract"><strong>Zusammenfassung:</strong></p>
          <p v-if="book.abstract">{{ book.abstract }}</p>
          <span v-if="book.isFavorite">⭐ Zu Favoriten hinzugefügt</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.wrapper {
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
}
</style>
