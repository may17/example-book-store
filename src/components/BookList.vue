<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import BookListItem from './BookListItem.vue'

interface Book {
  id: string
  title: string
  subtitle: string
  isbn: string
  abstract: string
  author: string
  publisher: string
  price: string
  numPages: number
  cover: string
  userId: number
  isFavorite?: boolean
}

const books = ref<Book[]>([])
const searchQuery = ref('')

const API_URL = 'http://localhost:4730'

const fetchBooks = async () => {
  try {
    const url = searchQuery.value
      ? `${API_URL}/books?q=${searchQuery.value}`
      : `${API_URL}/books?_start=0&_end=50`

    const response = await fetch(url)
    const data = await response.json()
    books.value = data
  } catch (error) {
    console.error('Error fetching books:', error)
  }
}

onMounted(() => {
  fetchBooks()
})

watch(searchQuery, () => {
  fetchBooks()
})

const toggleFavorite = async (bookId: string) => {
  const book = books.value.find(b => b.id === bookId)
  if (book) {
    try {
      const newFavoriteState = !book.isFavorite
      const response = await fetch(`${API_URL}/books/${bookId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ isFavorite: newFavoriteState }),
      })
      if (response.ok) {
        book.isFavorite = newFavoriteState
      } else {
        console.error('Failed to update favorite status')
      }
    } catch (error) {
      console.error('Error updating favorite status:', error)
    }
  }
}

const featuredBooks = computed(() => {
  return books.value.map((book) => {
    if (book.publisher === 'Addison-Wesley') {
      return {
        ...book,
        title: `🔥 ${book.title}`,
      }
    }
    return book
  })
})
</script>

<template>
  <header>
    <h1>Books</h1>
    <p>A list of our books</p>
  </header>
  <input type="search" v-model="searchQuery" placeholder="Search books..." />
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
