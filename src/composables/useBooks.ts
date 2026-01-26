import { ref, computed, onMounted, watch } from 'vue'
import type { Book } from '../types'

export function useBooks(url: string) {
  const books = ref<Book[]>([])
  const searchQuery = ref('')
  const loading = ref(false)
  const error = ref<unknown | null>(null)

  const fetchBooks = async () => {
    loading.value = true
    error.value = null
    try {
      const fetchUrl = searchQuery.value
        ? `${url}/books?q=${encodeURIComponent(searchQuery.value)}`
        : `${url}/books?_start=0&_end=50`

      const response = await fetch(fetchUrl)
      if (!response.ok) throw new Error(`HTTP ${response.status}`)
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
        const response = await fetch(`${url}/books/${bookId}`, {
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

  onMounted(() => {
    fetchBooks()
  })

  watch(searchQuery, () => {
    fetchBooks()
  })

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

  return {
    books,
    searchQuery,
    toggleFavorite,
    featuredBooks,
    loading,
    error,
  }
}
