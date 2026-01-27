<script setup lang="ts">
import { onMounted, watch } from 'vue'
import BookListItem from './BookListItem.vue'
import { useBookStore } from '../stores/books'

const store = useBookStore()

onMounted(() => {
  store.fetchBooks()
})

watch(() => store.searchQuery, () => {
  store.fetchBooks()
})
</script>

<template>
  <header>
    <h1>Books</h1>
    <p>A list of our books</p>
  </header>
  <input type="search" v-model="store.searchQuery" placeholder="Search books..." />
  <p v-if="store.loading">Lade Bücher…</p>
  <p v-if="store.error">Fehler beim Laden der Daten.</p>
  <div v-if="store.books.length > 0">
    <table>
      <thead>
        <tr>
          <th>Cover</th>
          <th>Title</th>
          <th>ISBN</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <BookListItem v-for="book in store.featuredBooks" :key="book.id" :title="book.title" :isbn="book.isbn"
          :num-pages="book.numPages" :cover="book.cover" :is-favorite="book.isFavorite"
          @toggle-favorite="store.toggleFavorite(book.id)" />
      </tbody>
    </table>
  </div>
  <div v-else>
    <p>Aktuell sind keine Einträge vorhanden.</p>
  </div>
</template>
