import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import About from '../views/About.vue'

const router = createRouter({
  history: createWebHistory('/vue3'),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/about',
      name: 'About',
      component: About
    },
    {
      path: '/dynamic-form',
      name: 'DynamicForm',
      component: () => import('../views/DynamicFormTestAsync.vue')
    },
    {
      path: '/dynamic-form-async',
      name: 'DynamicFormAsync',
      component: () => import('../views/DynamicFormAsyncTest.vue')
    }
  ]
})

export default router