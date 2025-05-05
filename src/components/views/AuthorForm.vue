<script setup>
import { useRoute, useRouter } from 'vue-router'
import { useForm, useField } from 'vee-validate'
import * as yup from 'yup'
import { computed, onMounted } from 'vue'
import { useStore } from '@/stores/store.js'

const { state, getters, actions } = useStore()
const route = useRoute()
const router = useRouter()

const isEditMode = computed(() => route.params.id !== 'novo')
const authorId = Number(route.params.id)

const schema = yup.object({
  name: yup.string().required('Nome é obrigatório'),
})

const { handleSubmit, setValues, errors } = useForm({ validationSchema: schema })
const { value: name } = useField('name')

onMounted(() => {
  if (isEditMode.value) {
    const author = state.authors.find(a => a.id === authorId)
    if (author) setValues({ ...author })
  }
})

const onSubmit = handleSubmit(values => {
  if (isEditMode.value) {
    actions.updateAuthor(authorId, values)
  } else {
    actions.addAuthor(values)
  }
  router.push('/autores')
})
</script>

<template>
  <div class="max-w-xl mx-auto p-6">
    <h1 class="text-2xl font-bold mb-6">
      {{ isEditMode ? 'Editar Autor' : 'Novo Autor' }}
    </h1>

    <form @submit.prevent="onSubmit" class="space-y-4">
      <div>
        <label class="block font-semibold">Nome</label>
        <input v-model="name" placeholder="Nome do autor" class="border p-2 w-full" />
        <p v-if="errors.name" class="text-red-500 text-sm">{{ errors.name }}</p>
      </div>
      <!-- Seção de livros do autor (somente no modo de edição) -->
      <div v-if="isEditMode" class="mt-10">
        <h2 class="text-xl font-semibold mb-2">Livros desse autor</h2>
        <ul v-if="getters.getBooksByAuthorId(authorId).length" class="list-disc pl-5 text-sm text-gray-700">
          <li v-for="book in getters.getBooksByAuthorId(authorId)" :key="book.id">
            {{ book.title }}
          </li>
        </ul>
        <p v-else class="text-gray-500 italic">Nenhum livro encontrado para este autor.</p>
      </div>

      <button type="submit" class="bg-blue-600 text-white px-4 py-2 rounded">
        {{ isEditMode ? 'Salvar Alterações' : 'Criar Autor' }}
      </button>
    </form>

  </div>
</template>
