<script setup lang="ts">
// @ts-ignore
import MicroApp from './views/MicroApp.vue'
import { useRoute } from 'vue-router'

const route = useRoute()
console.log('App-----------', route)
</script>

<template>
  <div class="app-container">
    <header class="app-header">
      <h1>微前端主应用</h1>
      <nav class="app-nav">
        <router-link to="/">主应用</router-link>
        <router-link to="/vue3">Vue3子应用</router-link>
        <router-link to="/react">React子应用</router-link>
      </nav>
    </header>
    <main class="app-main">
      <router-view v-if="route.path === '/'"></router-view>
      <MicroApp v-else></MicroApp>
    </main>
  </div>
</template>

<style scoped>
.app-container {
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
}

.app-header {
  background-color: #4a90e2;
  color: white;
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 60px;
}

.app-header h1 {
  font-size: 20px;
  margin: 0;
}

.app-nav {
  display: flex;
  gap: 10px;
}

.app-nav button {
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  background-color: rgba(255, 255, 255, 0.2);
  color: white;
  cursor: pointer;
  transition: background-color 0.3s;
}

.app-nav button:hover {
  background-color: rgba(255, 255, 255, 0.3);
}

.app-nav button.active {
  background-color: rgba(255, 255, 255, 0.4);
  font-weight: bold;
}

.app-main {
  flex: 1;
  padding: 20px;
  background-color: #f5f5f5;
}

.micro-app-container {
  width: 100%;
  height: 100%;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}
</style>
