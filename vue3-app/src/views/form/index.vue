<template>
  <div class="form-page-container">
    <el-card>
      <template #header>
        <span>动态表单测试</span>
      </template>
      <el-tabs v-model="activeTab" type="border-card">
        <el-tab-pane label="基础动态表单" name="basic">
          <DynamicFormTest />
        </el-tab-pane>
        <el-tab-pane label="异步动态表单" name="async">
          <DynamicFormTestAsync />
        </el-tab-pane>
        <el-tab-pane label="异步表单组件" name="async-component">
          <DynamicFormAsyncTest />
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import DynamicFormTest from '../DynamicFormTest.vue'
import DynamicFormTestAsync from '../DynamicFormTestAsync.vue'
import DynamicFormAsyncTest from '../DynamicFormAsyncTest.vue'

const activeTab = ref('basic')
</script>

<style scoped>
.form-page-container {
  padding: 10px;
}

:deep(.el-tabs__content) {
  padding: 20px;
}
</style>
