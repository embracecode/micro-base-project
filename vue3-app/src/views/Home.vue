<template>
  <div class="home">
    <h1>Vue3子应用 - 首页</h1>
    <p>欢迎使用Vue3子应用</p>
    <div v-if="baseState">
      <div>当前用户: {{ baseState.user.name }}</div>
      <button @click="changeMainData">切换主题</button>
    </div>
    <router-link to="/about">跳转到关于页面</router-link>
  </div>
</template>

<script setup lang="ts">
import { inject, reactive } from 'vue';
import { MAINDATA_KEY } from '../constant'

const mainData = inject(MAINDATA_KEY) as any

const baseState = reactive(mainData.baseState)
console.log('Home组件注入的mainData:', mainData, baseState)
const changeMainData = () => {
  baseState.user.name = '李四'
  baseState.theme = baseState.theme === 'light' ? 'dark' : 'light'
  mainData.onCusetomStateChange(mainData.baseState)
}

// Home组件
</script>

<style scoped>
.home {
  padding: 20px;
}

h1 {
  color: #4a90e2;
}

p {
  margin: 20px 0;
}

router-link {
  display: inline-block;
  padding: 8px 16px;
  background-color: #4a90e2;
  color: white;
  text-decoration: none;
  border-radius: 4px;
}

router-link:hover {
  background-color: #357abd;
}
</style>