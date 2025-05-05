<script setup>
import { useRouter } from 'vue-router'
import { useStore } from '@/stores/store.js'

const { state, getters } = useStore()
const router = useRouter()

const goToAuthor = (id) => {
  router.push(`/autores/${id}`)
}
</script>

<template>
  <div class="p-6 max-w-4xl mx-auto">
    <h1 class="text-2xl font-bold mb-6">Autores</h1>

    <div v-if="state.authors.length" class="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div
        v-for="author in state.authors"
        :key="author.id"
        class="border rounded p-4 shadow hover:bg-gray-50 cursor-pointer transition"
        @click="goToAuthor(author.id)"
      >
        <h2 class="text-lg font-semibold">{{ author.name }}</h2>
        <p class="text-sm text-gray-500 mb-2">ID: {{ author.id }}</p>

        <div v-if="getters.getBooksByAuthorId(author.id).length">
          <h3 class="font-semibold text-sm">Livros:</h3>
          <ul class="list-disc list-inside text-sm text-gray-700">
            <li v-for="book in getters.getBooksByAuthorId(author.id)" :key="book.id">
              {{ book.title }}
            </li>
          </ul>
        </div>
        <p v-else class="text-sm text-gray-400 italic">Nenhum livro cadastrado</p>
      </div>
    </div>
    
    <p v-else class="text-gray-500">Nenhum autor cadastrado.</p>
  </div>
</template>
