<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'

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

const toggleFavorite = (book: Book) => {
  book.isFavorite = !book.isFavorite
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
          <th>Title</th>
          <th>ISBN</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="book in featuredBooks" :key="book.id">
          <td style="width: 55%">{{ book.title }} <span v-if="book.isFavorite">⭐</span></td>
          <td style="width: 30%">{{ book.isbn }}</td>
          <td style="width: 15%">
            <button @click="toggleFavorite(book)">
              {{ book.isFavorite ? 'Remove' : 'Add' }}
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <div v-else>
    <p>Aktuell sind keine Einträge vorhanden.</p>
  </div>
</template>
