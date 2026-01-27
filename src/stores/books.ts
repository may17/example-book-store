import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { Book } from '../types'

const API_URL = 'http://localhost:4730'

export const useBookStore = defineStore('books', () => {
  // State
  const books = ref<Book[]>([])
  const searchQuery = ref('')
  const loading = ref(false)
  const error = ref<unknown | null>(null)
  const totalBooks = ref(0)

  // Getters
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

  // Actions
  const fetchBooks = async () => {
    loading.value = true
    error.value = null
    try {
      const fetchUrl = searchQuery.value
        ? `${API_URL}/books?q=${encodeURIComponent(searchQuery.value)}`
        : `${API_URL}/books?_start=0&_end=50`

      const response = await fetch(fetchUrl)
      if (!response.ok) throw new Error(`HTTP ${response.status}`)

      // Extract total count from headers
      const countHeader = response.headers.get('X-Total-Count')
      if (countHeader) {
        totalBooks.value = parseInt(countHeader, 10)
      }

      const data = await response.json()
      books.value = data
    } catch (err) {
      console.error('Error fetching books:', err)
      error.value = err
    } finally {
      loading.value = false
    }
  }

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
      } catch (err) {
        console.error('Error updating favorite status:', err)
        error.value = err
      }
    }
  }

  return {
    books,
    searchQuery,
    loading,
    error,
    totalBooks,
    featuredBooks,
    fetchBooks,
    toggleFavorite,
  }
})
