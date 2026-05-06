<template>
  <div class="page-container">
    <el-card>
      <template #header>
        <span>菜单1-1</span>
      </template>
      <p>这是三级菜单页面：菜单1-1</p>
      <p>当前路径：{{ $route.path }}</p>
    </el-card>
  </div>
</template>

<script setup lang="ts">
// Menu1-1 page
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
