<script setup>
import { computed, ref } from 'vue'
import { useStore } from '@/stores/store.js'
import BookModal from '@/components/BookModal.vue'

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
            <div v-for="book in filteredBooks" :key="book.id" @click="openModal(book)"
                class="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden flex flex-col">
                <!-- Capa -->
                <div class="w-full h-64 bg-gray-100 flex items-center justify-center">
                    <img :src="book.cover" :alt="book.title"
                        class="max-h-full object-contain transition-transform duration-300 hover:scale-105" />
                </div>

                <!-- Informações -->
                <div class="p-4 flex flex-col gap-2">
                    <div class="flex flex-row justify-between items-center">
                        <h2 class="text-lg font-semibold text-gray-800 line-clamp-2">{{ book.title }}</h2>
                        <span class="text-lg font-semibold text-gray-800">#{{ book.id }}</span>
                    </div>
                    <div class="text-sm text-gray-600">
                        <p><strong>Ano:</strong> {{ book.year }}</p>
                        <p><strong>Autor:</strong> {{ getters.getAuthorById(book.authorId)?.name }}</p>
                        <p><strong>Editora:</strong> {{ getters.getPublisherById(book.publisherId)?.name }}</p>
                    </div>
                    
                </div>
            </div>
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