<template>
  <div class="micro-app-container">
    <!-- qiankun 子应用挂载容器 -->
    <div id="micro-app"></div>
  </div>
</template>

<script setup>


</script>


<style scoped>
.micro-app-container {
  width: 100%;
  height: 100%;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.micro-app-iframe {
  width: 100%;
  height: 100%;
  border: none;
}

.micro-app-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 18px;
  color: #999;
}
</style>