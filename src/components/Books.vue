<script setup>
import { useStore } from '@/stores/store.js'

const { state, getters } = useStore()
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
                <input type="text" placeholder="Pesquisar..." class="mb-4 p-2 border rounded"
                    v-model="state.searchQuery" />
            </div>
            <div v-for="book in state.books" :key="book.id"
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
    </div>
</template>