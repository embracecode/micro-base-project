<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import {
  Odometer,
  Setting,
  User,
  UserFilled,
  Menu,
  Document,
  DocumentChecked,
  DocumentCopy,
  EditPen,
  Fold,
  Expand
} from '@element-plus/icons-vue'
import type { Component } from 'vue'
import SidebarItem from './SidebarItem.vue'
import type { MenuItem } from './SidebarItem.vue'

const props = defineProps<{
  collapse: boolean
}>()

const emit = defineEmits<{
  (e: 'update:collapse', value: boolean): void
}>()

const route = useRoute()

const iconMap: Record<string, Component> = {
  Odometer,
  Setting,
  User,
  UserFilled,
  Menu,
  Document,
  DocumentChecked,
  DocumentCopy,
  EditPen,
  Fold,
  Expand
}

const activeMenu = computed(() => {
  const { path } = route
  return path
})

const isCollapse = computed({
  get: () => props.collapse,
  set: (val) => emit('update:collapse', val)
})

const menuList: MenuItem[] = [
  {
    path: '/dashboard',
    title: '仪表盘',
    icon: 'Odometer'
  },
  {
    path: '/system',
    title: '系统管理',
    icon: 'Setting',
    children: [
      {
        path: '/system/user',
        title: '用户管理',
        icon: 'User'
      },
      {
        path: '/system/role',
        title: '角色管理',
        icon: 'UserFilled'
      }
    ]
  },
  {
    path: '/nested',
    title: '嵌套菜单',
    icon: 'Menu',
    children: [
      {
        path: '/nested/menu1',
        title: '菜单1',
        icon: 'Document',
        children: [
          {
            path: '/nested/menu1/menu1-1',
            title: '菜单1-1',
            icon: 'DocumentChecked'
          },
          {
            path: '/nested/menu1/menu1-2',
            title: '菜单1-2',
            icon: 'DocumentCopy'
          }
        ]
      },
      {
        path: '/nested/menu2',
        title: '菜单2',
        icon: 'Document'
      }
    ]
  },
  {
    path: '/form/dynamic-form',
    title: '动态表单',
    icon: 'EditPen'
  }
]
</script>

<template>
  <div class="sidebar-container" :class="{ collapsed: isCollapse }">
    <div class="logo">
      <span v-show="!isCollapse" class="logo-text">Admin</span>
      <el-icon v-show="isCollapse" class="logo-icon"><Odometer /></el-icon>
    </div>
    <div class="menu-wrap">
      <el-menu
        :default-active="activeMenu"
        :collapse="isCollapse"
        :collapse-transition="false"
        router
        background-color="#304156"
        text-color="#bfcbd9"
        active-text-color="#409EFF"
      >
        <SidebarItem
          v-for="item in menuList"
          :key="item.path"
          :item="item"
          :icon-map="iconMap"
        />
      </el-menu>
    </div>
  </div>
</template>

<style scoped>
.sidebar-container {
  height: 100%;
  background-color: #304156;
  display: flex;
  flex-direction: column;
  width: 210px;
  transition: width 0.28s;
  flex-shrink: 0;
}

.sidebar-container.collapsed {
  width: 64px;
}

.logo {
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #2b3649;
  color: #fff;
  font-size: 18px;
  font-weight: bold;
  border-bottom: 1px solid #1f2d3d;
  flex-shrink: 0;
}

.logo-text {
  white-space: nowrap;
}

.logo-icon {
  font-size: 20px;
}

.menu-wrap {
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
}

/* 隐藏滚动条但保留滚动功能 */
.menu-wrap::-webkit-scrollbar {
  width: 0;
  height: 0;
}

:deep(.el-menu) {
  border-right: none;
  width: 100% !important;
}

/* 修复 el-sub-menu 展开时的抖动：确保 popper 宽度固定 */
:deep(.el-menu--vertical .el-sub-menu__title) {
  padding-right: 20px;
}

:deep(.el-menu--collapse .el-sub-menu__title) {
  padding-right: 0;
}
</style>
