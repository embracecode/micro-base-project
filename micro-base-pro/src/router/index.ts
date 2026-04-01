import { createRouter, createWebHistory } from 'vue-router'


const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: () => import('../views/Home.vue')
    },
    {
      path: '/vue3',
      name: 'Vue3App',
      component: () => import('../views/MicroApp.vue')
    },
    {
      path: '/react',
      name: 'ReactApp',
      component: () => import('../views/MicroApp.vue')
    }
  ]
})

export default router