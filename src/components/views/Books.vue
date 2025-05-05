<script setup>
import { computed, ref } from 'vue'
import { useStore } from '@/stores/store.js'
import BookModal from '@/components/BookModal.vue'
import BookCard from '@/components/BookCard.vue'

const { state, getters } = useStore()
const searchQuery = ref('')
const selectedBook = ref(null)
const showModal = ref(false)

const filteredBooks = computed(() => {
  const query = searchQuery.value.toLowerCase()
  return state.books.filter(book => {
    const title = book.title?.toLowerCase() || ''
    const author = getters.getAuthorById(book.authorId)?.name.toLowerCase() || ''
    const publisher = getters.getPublisherById(book.publisherId)?.name.toLowerCase() || ''

    return title.includes(query) || author.includes(query) || publisher.includes(query)
  })
})

const openModal = (book) => {
  selectedBook.value = book
  showModal.value = true
}
const closeModal = () => {
  showModal.value = false
  selectedBook.value = null
}
</script>

<template>
    <div class="flex flex-col min-h-screen">
        <!-- Header -->
        <header class="w-full p-4 text-2xl text-center font-semibold border-b bg-white shadow-sm">
            Livros
        </header>

        <!-- Grid de Cards -->
        <main class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
            <div class="col-span-1 sm:col-span-2 md:col-span-3 lg:col-span-4 mb-4">
                <input
                    type="text"
                    placeholder="Pesquisar por título, autor ou editora..."
                    class="mb-4 p-2 border rounded w-full"
                    v-model="searchQuery"
                />
            </div>
            <BookCard
                v-for="book in filteredBooks"
                :key="book.id"
                :book="book"
                :author="getters.getAuthorById(book.authorId)?.name"
                :publisher="getters.getPublisherById(book.publisherId)?.name"
                @click="openModal"
            />
        </main>
        <BookModal
            v-if="selectedBook"
            :show="showModal"
            :book="selectedBook"
            :author="getters.getAuthorById(selectedBook.authorId)?.name"
            :publisher="getters.getPublisherById(selectedBook.publisherId)?.name"
            @close="closeModal"
            />
    </div>
</template>