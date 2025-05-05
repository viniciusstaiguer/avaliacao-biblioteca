<script setup>
defineProps({
  show: Boolean,
  book: Object,
  author: String,
  publisher: String
})

const emit = defineEmits(['close'])

const onClose = () => {
  emit('close')
}
</script>
<template>
    <div
      v-if="show"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      @click.self="onClose"
    >
      <div class="bg-white rounded-lg p-16 max-w-sm w-full shadow-lg relative">
        <button @click="onClose" class="absolute top-2 right-2 text-xl font-bold">
            <i class="pi pi-times"></i>
        </button>
  
        <div class="flex flex-col items-start">
          <img
            :src="book.cover"
            alt="capa"
            class="w-full h-96 object-contain mb-4"
          />
          <h2 class="text-xl font-bold mb-2 "><strong>Título:</strong> {{ book.title }}</h2>
          <p><strong>Autor:</strong> {{ author }}</p>
          <p><strong>Editora:</strong> {{ publisher }}</p>
          <p><strong>Ano:</strong> {{ book.year }}</p>
          <p class="mt-3 text-sm text-gray-700 text-justify">{{ book.sinopsis }}</p>
        </div>
      </div>
    </div>
  </template>
  