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
            ]
        },
        
    ]
})

export default router
