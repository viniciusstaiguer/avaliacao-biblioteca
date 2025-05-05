<script setup>
import { useRouter } from 'vue-router'
import { useStore } from '@/stores/store.js'

const { state } = useStore()
const router = useRouter()

const goToPublisher = (id) => {
  router.push(`/editoras/${id}`)
}
</script>

<template>
  <div class="p-6 max-w-4xl mx-auto">
    <h1 class="text-2xl font-bold mb-6">Editoras</h1>

    <div v-if="state.publishers.length" class="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div
        v-for="publisher in state.publishers"
        :key="publisher.id"
        class="border rounded p-4 shadow hover:bg-gray-50 cursor-pointer transition"
        @click="goToPublisher(publisher.id)"
      >
        <h2 class="text-lg font-semibold">{{ publisher.name }}</h2>
        <p class="text-sm text-gray-500">ID: {{ publisher.id }}</p>
      </div>
    </div>
    
    <p v-else class="text-gray-500">Nenhuma editora cadastrada.</p>
  </div>
</template>
