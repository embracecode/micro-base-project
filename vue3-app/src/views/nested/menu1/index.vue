<template>
  <div class="page-container">
    <el-card>
      <template #header>
        <span>菜单1 - 首页</span>
      </template>
      <p>这是嵌套菜单1的默认页面</p>
      <p>菜单1下还有两个子菜单：菜单1-1 和 菜单1-2</p>
      <el-button type="primary" @click="$router.push('/nested/menu1/menu1-1')">跳转到菜单1-1</el-button>
      <el-button type="success" @click="$router.push('/nested/menu1/menu1-2')">跳转到菜单1-2</el-button>
    </el-card>
  </div>
</template>

<script setup lang="ts">
// Menu1 page
</script>

<style scoped>
.page-container {
  padding: 10px;
}

p {
  margin: 10px 0;
  color: #606266;
}
</style>
