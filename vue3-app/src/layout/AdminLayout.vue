<script setup lang="ts">
import { ref } from 'vue'
import AppHeader from './components/AppHeader.vue'
import AppSidebar from './components/AppSidebar.vue'

const isCollapse = ref(false)

function toggleCollapse() {
  isCollapse.value = !isCollapse.value
}
</script>

<template>
  <div class="admin-layout">
    <AppHeader :collapse="isCollapse" @toggle-collapse="toggleCollapse" />
    <div class="main-container">
      <AppSidebar v-model:collapse="isCollapse" />
      <div class="content-wrapper">
        <div class="app-main">
          <router-view v-slot="{ Component }">
            <transition name="fade-transform" mode="out-in">
              <component :is="Component" />
            </transition>
          </router-view>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.admin-layout {
  height: 100vh;
  display: flex;
  flex-direction: column;
}

.main-container {
  flex: 1;
  display: flex;
  overflow: hidden;
}

.content-wrapper {
  flex: 1;
  overflow: auto;
  background-color: #f0f2f5;
  min-width: 0;
}

.app-main {
  padding: 20px;
  min-height: 100%;
}

/* 简单的页面切换动画 */
.fade-transform-enter-active,
.fade-transform-leave-active {
  transition: all 0.3s;
}

.fade-transform-enter-from {
  opacity: 0;
  transform: translateX(-10px);
}

.fade-transform-leave-to {
  opacity: 0;
  transform: translateX(10px);
}
</style>
