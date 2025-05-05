import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/:pathMatch(.*)*',
      name: '404',
      component: () => import('../pages/404.vue'),
    },
    {
      path: '/',
      name: 'wrapper',
      component: () => import('../components/AppWrapper.vue'),
      children: [
        {
          path: 'home',
          name: 'home',
          component: () => import('../components/views/Home.vue'),
        },
        {
          path: 'livros',
          name: 'livros',
          component: () => import('../components/views/Books.vue'),
        },
        {
          path: 'livros/novo',
          name: 'newBook',
          component: () => import('@/components/views/BookForm.vue'),
          props: { id: 'novo' }, // forçamos o id como 'novo'
        },
        {
          path: 'livros/:id',
          name: 'BookForm',
          component: () => import('@/components/views/BookForm.vue'),
          props: true,
        },
        {
          path: 'autores',
          name: 'AuthorView',
          component: () => import('@/components/views/Author.vue'),
        },
        {
          path: 'autores/:id(\\d+|novo)',
          name: 'AuthorForm',
          component: () => import('@/components/views/AuthorForm.vue'),
          props: true,
        },
        {
          path: 'editoras/',
          name: 'EditoraView',
          component: () => import('@/components/views/Publisher.vue'),
        },
        {
          path: 'editoras/:id(\\d+|novo)',
          name: 'EditoraForm',
          component: () => import('@/components/views/PublisherForm.vue'),
          props: true,
        },
      ],
    },
  ],
})

export default router