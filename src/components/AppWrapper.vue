<script setup>
import { ref } from 'vue';
import { RouterView } from 'vue-router';
import Toast from 'primevue/toast';
import { isArray } from '@/utils/utils.js';

const menuOpen = ref(true)

const toggleMenu = () => {
    menuOpen.value = !menuOpen.value
}
const menus = [

    {
        label: 'Home',
        icon: 'pi pi-home',
        path: '/home'
    },
    {
        label: 'Livros',
        icon: 'pi pi-book',
        path: '/livros'
    },
    {
        label: 'Autores',
        icon: 'pi pi-user',
        path: '/autores'
    },
];

</script>
<template>
    <div class="flex flex-col w-full h-screen">
        <!-- Topbar -->
        <div class="w-full p-3 text-2xl font-semibold border-b flex items-center justify-between">
            Book Mark
        </div>

        <!-- Layout principal -->
        <div class="flex h-full relative">

            <!-- Botão sempre visível e posicionado conforme estado do menu -->
            <button @click="toggleMenu"
                class="absolute top-4 z-20 bg-white border border-gray-300 rounded-full shadow p-2 text-xl"
                :class="menuOpen ? 'left-48' : 'left-0'">
                <i :class="menuOpen ? 'pi pi-angle-left' : 'pi pi-angle-right'" />
            </button>

            <!-- Menu lateral responsivo -->
            <div v-show="menuOpen"
                class="absolute z-10 bg-white w-52 h-full px-3 py-4 shadow-md border-r lg:static lg:block">
                <ul class="menu space-y-2 mt-10">
                    <RouterLink
                        :to="menu.path"
                        v-for="menu in menus"
                        :key="menu.path"
                        @click="menuOpen = false"
                    >
                        <li class="menu-item">
                            <i :class="menu.icon" />
                            <span>{{ menu.label }}</span>
                        </li>
                    </RouterLink>
                </ul>
            </div>

            <!-- Conteúdo -->
            <div class="p-4 w-full h-full">
                <RouterView />
            </div>
        </div>

        <!-- Toast -->
        <Toast position="bottom-center">
            <template #message="{ message }">
                <span :class="[
                    'p-toast-message-icon',
                    'pi',
                    {
                        'pi-check': message.severity === 'success',
                    },
                    {
                        'pi-exclamation-triangle':
                            message.severity === 'warning',
                    },
                    { 'pi-times': message.severity === 'error' },
                    {
                        'pi-info-circle': message.severity === 'info',
                    },
                ]"></span>
                <div class="p-toast-message-text">
                    <span class="p-toast-summary">{{ message.summary }}</span>
                    <div class="p-toast-detail">
                        <template v-if="!isArray(message.detail)">
                            <span class="text-black">{{ message.detail }}</span>
                        </template>
                        <p 
                            v-else
                            class="m-0"
                            v-for="(item, index) in message.detail"
                            :key="index"
                        >
                            {{ item }}
                        </p>
                    </div>
                </div>
            </template>
        </Toast>
    </div>
</template>
<style scoped lang="less">
.menu {

    &-item {

        display: flex;
        align-items: baseline;
        cursor: pointer;
        user-select: none;
        border-radius: .3rem;
        padding: 8px 2px 0 6px;
        padding-bottom: 6px;
        transition-duration: 200ms;

        span {

            margin-left: 3px;
        }

        &:hover {

            background-color: var(--color-background-inverted);
            color: var(--color-text-inverted);
        }
    }
}

</style>