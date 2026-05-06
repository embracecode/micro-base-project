import { createRouter, createWebHistory } from 'vue-router'
import { qiankunWindow } from 'vite-plugin-qiankun/dist/helper'
import AdminLayout from '../layout/AdminLayout.vue'

const base = qiankunWindow.__POWERED_BY_QIANKUN__ ? '/vue3' : '/'

const router = createRouter({
  history: createWebHistory(base),
  routes: [
    {
      path: '/',
      component: AdminLayout,
      redirect: '/dashboard',
      children: [
        {
          path: 'dashboard',
          name: 'Dashboard',
          component: () => import('../views/dashboard/index.vue'),
          meta: { title: '仪表盘', icon: 'Odometer' }
        },
        {
          path: 'system/user',
          name: 'User',
          component: () => import('../views/system/user.vue'),
          meta: { title: '用户管理', icon: 'User' }
        },
        {
          path: 'system/role',
          name: 'Role',
          component: () => import('../views/system/role.vue'),
          meta: { title: '角色管理', icon: 'UserFilled' }
        },
        {
          path: 'nested/menu1',
          name: 'Menu1',
          component: () => import('../views/nested/menu1/index.vue'),
          meta: { title: '菜单1', icon: 'Document' }
        },
        {
          path: 'nested/menu1/menu1-1',
          name: 'Menu1-1',
          component: () => import('../views/nested/menu1/menu1-1/index.vue'),
          meta: { title: '菜单1-1', icon: 'DocumentChecked' }
        },
        {
          path: 'nested/menu1/menu1-2',
          name: 'Menu1-2',
          component: () => import('../views/nested/menu1/menu1-2/index.vue'),
          meta: { title: '菜单1-2', icon: 'DocumentCopy' }
        },
        {
          path: 'nested/menu2',
          name: 'Menu2',
          component: () => import('../views/nested/menu2/index.vue'),
          meta: { title: '菜单2', icon: 'Document' }
        },
        {
          path: 'form/dynamic-form',
          name: 'DynamicForm',
          component: () => import('../views/form/index.vue'),
          meta: { title: '动态表单', icon: 'EditPen' }
        }
      ]
    }
  ]
})

export default router
