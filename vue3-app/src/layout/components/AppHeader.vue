<script setup lang="ts">
import { Fold, Expand } from '@element-plus/icons-vue'

const props = defineProps<{
  collapse: boolean
}>()

const emit = defineEmits<{
  (e: 'toggle-collapse'): void
}>()
</script>

<template>
  <div class="app-header">
    <div class="header-left">
      <div class="collapse-btn" @click="emit('toggle-collapse')">
        <el-icon size="20">
          <Fold v-if="!collapse" />
          <Expand v-else />
        </el-icon>
      </div>
      <span class="header-title">Vue3 后台管理系统</span>
    </div>
    <div class="header-right">
      <el-dropdown>
        <span class="user-info">
          <el-avatar :size="28" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
          <span class="username">管理员</span>
          <el-icon><ArrowDown /></el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>个人中心</el-dropdown-item>
            <el-dropdown-item>退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script lang="ts">
import { ArrowDown } from '@element-plus/icons-vue'
export default {
  components: {
    ArrowDown
  }
}
</script>

<style scoped>
.app-header {
  height: 50px;
  background-color: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 16px;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 16px;
}

.collapse-btn {
  cursor: pointer;
  color: #606266;
  padding: 4px;
  border-radius: 4px;
  transition: background-color 0.3s;
}

.collapse-btn:hover {
  background-color: #f5f7fa;
}

.header-title {
  font-size: 16px;
  font-weight: 500;
  color: #303133;
}

.header-right {
  display: flex;
  align-items: center;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  padding: 4px 8px;
  border-radius: 4px;
  transition: background-color 0.3s;
}

.user-info:hover {
  background-color: #f5f7fa;
}

.username {
  font-size: 14px;
  color: #606266;
}
</style>
