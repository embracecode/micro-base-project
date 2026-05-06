<script setup lang="ts">
import type { Component } from 'vue'

export interface MenuItem {
  path: string
  title: string
  icon?: string
  children?: MenuItem[]
}

defineProps<{
  item: MenuItem
  iconMap: Record<string, Component>
}>()
</script>

<template>
  <!-- 有子菜单的情况 -->
  <el-sub-menu v-if="item.children && item.children.length > 0" :index="item.path">
    <template #title>
      <el-icon v-if="item.icon">
        <component :is="iconMap[item.icon]" />
      </el-icon>
      <span>{{ item.title }}</span>
    </template>

    <!-- 递归渲染子菜单 -->
    <SidebarItem
      v-for="child in item.children"
      :key="child.path"
      :item="child"
      :icon-map="iconMap"
    />
  </el-sub-menu>

  <!-- 没有子菜单的情况 -->
  <el-menu-item v-else :index="item.path">
    <el-icon v-if="item.icon">
      <component :is="iconMap[item.icon]" />
    </el-icon>
    <template #title>
      <span>{{ item.title }}</span>
    </template>
  </el-menu-item>
</template>
