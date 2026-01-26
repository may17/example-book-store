import { ref, computed, onMounted, watch } from 'vue'
import type { Book } from '../types'

const API_URL = 'http://localhost:4730'

export function useBooks() {
  const books = ref<Book[]>([])
  const searchQuery = ref('')

  const fetchBooks = async () => {
    try {
      const fetchUrl = searchQuery.value
        ? `${API_URL}/books?q=${searchQuery.value}`
        : `${API_URL}/books?_start=0&_end=50`

      const response = await fetch(fetchUrl)
      const data = await response.json()
      books.value = data
    } catch (error) {
      console.error('Error fetching books:', error)
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
      } catch (error) {
        console.error('Error updating favorite status:', error)
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
  }
}
