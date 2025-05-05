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
                component: () => import('../components/views/Home.vue')
              },
              {
                path: 'livros',
                name: 'livros',
                component: () => import('../components/views/Books.vue')
              },
              {
                path: '/livros/novo',
                name: 'LivroNovo',
                component: () => import('@/components/views/LivroForm.vue'),
                props: { id: 'novo' } // forçamos o id como 'novo'
              },
              {
                path: '/livros/:id',
                name: 'LivroForm',
                component: () => import('@/components/views/LivroForm.vue'),
                props: true
              }
            ]
        },
        
    ]
})

export default router
