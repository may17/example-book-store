<script setup lang="ts">
import { ref, computed, watchEffect } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import type { Book } from '../types'

const props = defineProps<{ isbn: string }>()
const router = useRouter()

const book = ref<Partial<Book>>({})
const loading = ref(false)
const error = ref<unknown | null>(null)
const saving = ref(false)

const API_URL = 'http://localhost:4730'

const fetchBook = async (isbn: string) => {
  loading.value = true
  error.value = null
  try {
    const response = await fetch(`${API_URL}/books/${isbn}`)
    if (!response.ok) throw new Error(`HTTP ${response.status}`)
    const data = await response.json()
    book.value = { ...data }
  } catch (err) {
    console.error('Error fetching book:', err)
    error.value = err instanceof Error ? err.message : String(err)
  } finally {
    loading.value = false
  }
}

watchEffect(() => {
  if (props.isbn) {
    fetchBook(props.isbn)
  }
})

const isTitleInvalid = computed(() => {
  return !book.value.title || book.value.title.length < 4
})

const saveBook = async () => {
  if (isTitleInvalid.value) {
    error.value = 'Der Titel muss mindestens 4 Zeichen lang sein.'
    return
  }

  saving.value = true
  error.value = null
  try {
    const response = await fetch(`${API_URL}/books/${props.isbn}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: book.value.title,
      }),
    })
    if (!response.ok) throw new Error(`HTTP ${response.status}`)
    await router.push({ name: 'book-detail', params: { isbn: props.isbn } })
  } catch (err) {
    console.error('Error saving book:', err)
    error.value = err instanceof Error ? err.message : String(err)
  } finally {
    saving.value = false
  }
}
</script>

<template>
  <div>
    <RouterLink to="/books">← Zurück zu Büchern</RouterLink>

    <h1>Buch bearbeiten</h1>

    <p v-if="loading">Lade Buchdetails…</p>
    <p v-if="error" style="color: var(--form-element-invalid-border-color);">
      Fehler: {{ error }}
    </p>

    <form v-if="!loading" @submit.prevent="saveBook">
      <div>
        <label for="book-title">Titel *</label>
        <input id="book-title" v-model="book.title" type="text" placeholder="Buchtitel" :aria-invalid="isTitleInvalid"
          :aria-describedby="isTitleInvalid ? 'title-helper' : undefined" />
        <small id="title-helper" v-if="isTitleInvalid">
          Der Titel muss mindestens 4 Zeichen lang sein.
        </small>
      </div>

      <button type="submit" :disabled="isTitleInvalid || saving">
        {{ saving ? 'Speichern…' : 'Speichern' }}
      </button>
      <RouterLink to="/books">
        <button type="button">Abbrechen</button>
      </RouterLink>
    </form>
  </div>
</template>

<style scoped>
form {
  max-width: 600px;
  margin-top: 2rem;
}

small {
  display: block;
  margin-top: 0.25rem;
  color: var(--form-element-invalid-border-color);
  font-size: 0.875rem;
}

button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>
