<script setup>
import { useForm, useField } from 'vee-validate'
import * as yup from 'yup'
import { useRoute, useRouter } from 'vue-router'
import { onMounted, computed } from 'vue'
import { useStore } from '@/stores/store.js'

const { state, getters, actions } = useStore()
const route = useRoute()
const router = useRouter()

const isEditMode = computed(() => route.params.id !== 'novo')
const bookId = Number(route.params.id)

const schema = yup.object({
  title: yup.string().required('Título é obrigatório'),
  year: yup.number().required('Ano é obrigatório').typeError('Ano deve ser um número'),
  cover: yup.string().required('URL da capa é obrigatória'),
  authorId: yup.string().required('Autor é obrigatório'),
  publisherId: yup.string().required('Editora é obrigatória'),
  sinopsis: yup.string().required('Sinopse é obrigatória')
})

const { handleSubmit, setValues, errors } = useForm({
  validationSchema: schema
})

const { value: title } = useField('title')
const { value: year } = useField('year')
const { value: cover } = useField('cover')
const { value: authorId } = useField('authorId')
const { value: publisherId } = useField('publisherId')
const { value: sinopsis } = useField('sinopsis')

onMounted(() => {
  if (isEditMode.value) {
    const book = state.books.find(b => b.id === bookId)
    if (book) {
      setValues({ ...book })
    }
  }
})

const onSubmit = handleSubmit(values => {
  if (isEditMode.value) {
    actions.updateBook(bookId, values)
  } else {
    actions.addBook(values)
  }
  router.push('/livros')
})
</script>

<template>
  <div class="max-w-xl mx-auto p-6">
    <h1 class="text-2xl font-bold mb-6">
      {{ isEditMode ? 'Editar Livro' : 'Novo Livro' }}
    </h1>

    <form @submit.prevent="onSubmit" class="space-y-4">
      <div>
        <label class="block font-semibold">Título</label>
        <input v-model="title" placeholder="Título do livro" class="border p-2 w-full" />
        <p v-if="errors.title" class="text-red-500 text-sm">{{ errors.title }}</p>
      </div>

      <div>
        <label class="block font-semibold">Ano de Publicação</label>
        <input v-model="year" type="number" placeholder="Ex: 2020" class="border p-2 w-full" />
        <p v-if="errors.year" class="text-red-500 text-sm">{{ errors.year }}</p>
      </div>

      <div>
        <label class="block font-semibold">Foto de Capa (URL)</label>
        <input v-model="cover" placeholder="https://..." class="border p-2 w-full" />
        <p v-if="errors.cover" class="text-red-500 text-sm">{{ errors.cover }}</p>
      </div>

      <div>
        <label class="block font-semibold">Autor</label>
        <select v-model="authorId" class="border p-2 w-full">
          <option disabled value="">Selecione um autor</option>
          <option v-for="author in state.authors" :key="author.id" :value="author.id">
            {{ author.name }}
          </option>
        </select>
        <p v-if="errors.authorId" class="text-red-500 text-sm">{{ errors.authorId }}</p>
      </div>

      <div>
        <label class="block font-semibold">Editora</label>
        <select v-model="publisherId" class="border p-2 w-full">
          <option disabled value="" placeholder="">Selecione uma editora</option>
          <option v-for="publisher in state.publishers" :key="publisher.id" :value="publisher.id">
            {{ publisher.name }}
          </option>
        </select>
        <p v-if="errors.publisherId" class="text-red-500 text-sm">{{ errors.publisherId }}</p>
      </div>

      <div>
        <label class="block font-semibold">Sinopse</label>
        <textarea v-model="sinopsis" placeholder="Resumo do livro" class="border p-2 w-full" />
        <p v-if="errors.sinopsis" class="text-red-500 text-sm">{{ errors.sinopsis }}</p>
      </div>

      <button type="submit" class="bg-blue-600 text-white px-4 py-2 rounded">
        {{ isEditMode ? 'Salvar Alterações' : 'Criar Livro' }}
      </button>
    </form>
  </div>
</template>
