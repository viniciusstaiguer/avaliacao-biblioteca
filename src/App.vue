<script setup>
import { RouterView } from 'vue-router'
import { provide } from 'vue'
import { useStore } from '@/stores/store.js'

const store = useStore()
provide('store', store)
</script>
<template>
  <RouterView />
</template>