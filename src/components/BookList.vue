<script setup lang="ts">
import BookListItem from './BookListItem.vue'
import { useBooks } from '../composables/useBooks'

const API_URL = 'http://localhost:4730'
const { books, searchQuery, toggleFavorite, featuredBooks, loading, error } = useBooks(API_URL)
</script>

<template>
  <header>
    <h1>Books</h1>
    <p>A list of our books</p>
  </header>
  <input type="search" v-model="searchQuery" placeholder="Search books..." />
  <p v-if="loading">Lade Bücher…</p>
  <p v-if="error">Fehler beim Laden der Daten.</p>
  <div v-if="books.length > 0">
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
        <BookListItem v-for="book in featuredBooks" :key="book.id" :title="book.title" :isbn="book.isbn"
          :num-pages="book.numPages" :cover="book.cover" :is-favorite="book.isFavorite"
          @toggle-favorite="toggleFavorite(book.id)" />
      </tbody>
    </table>
  </div>
  <div v-else>
    <p>Aktuell sind keine Einträge vorhanden.</p>
  </div>
</template>
