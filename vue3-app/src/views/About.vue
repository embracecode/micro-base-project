<template>
  <div class="about">
    <h1>Vue3子应用 - 关于页面</h1>
    <p>这是Vue3子应用的关于页面</p>
    <router-link to="/">返回首页</router-link>
  </div>
</template>

<script setup lang="ts">
// About组件
</script>

<style scoped>
.about {
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