<script setup>
const props = defineProps({
    book: Object,
    author: String,
    publisher: String
})
const emit = defineEmits(['click'])

const onClick = () => {
    emit('click', props.book)
}
</script>
<template>
    <div class="cursor-pointer bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden flex flex-col"
        @click="onClick">
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
                <p><strong>Autor:</strong> {{ author }}</p>
                <p><strong>Editora:</strong> {{ publisher }}</p>
            </div>
        </div>
    </div>
</template>