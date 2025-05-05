<script setup>
import { useRoute, useRouter } from 'vue-router'
import { useForm, useField } from 'vee-validate'
import * as yup from 'yup'
import { computed, onMounted } from 'vue'
import { useStore } from '@/stores/store.js'

const { state, actions } = useStore()
const route = useRoute()
const router = useRouter()

const isEditMode = computed(() => route.params.id !== 'novo')
const publisherId = Number(route.params.id)

const schema = yup.object({
  name: yup.string().required('Nome é obrigatório'),
})

const { handleSubmit, setValues, errors } = useForm({ validationSchema: schema })
const { value: name } = useField('name')

onMounted(() => {
  if (isEditMode.value) {
    const publisher = state.publishers.find(p => p.id === publisherId)
    if (publisher) setValues({ ...publisher })
  }
})

const onSubmit = handleSubmit(values => {
  if (isEditMode.value) {
    actions.updatePublisher(publisherId, values)
  } else {
    actions.addPublisher(values)
  }
  router.push('/editoras')
})
</script>

<template>
  <div class="max-w-xl mx-auto p-6">
    <h1 class="text-2xl font-bold mb-6">
      {{ isEditMode ? 'Editar Editora' : 'Nova Editora' }}
    </h1>

    <form @submit.prevent="onSubmit" class="space-y-4">
      <div>
        <label class="block font-semibold">Nome</label>
        <input v-model="name" placeholder="Nome da editora" class="border p-2 w-full" />
        <p v-if="errors.name" class="text-red-500 text-sm">{{ errors.name }}</p>
      </div>

      <button type="submit" class="bg-blue-600 text-white px-4 py-2 rounded">
        {{ isEditMode ? 'Salvar Alterações' : 'Criar Editora' }}
      </button>
    </form>
  </div>
</template>
