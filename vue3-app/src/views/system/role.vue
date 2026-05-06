<template>
  <div class="role-container">
    <el-card>
      <template #header>
        <div class="card-header">
          <span>角色管理</span>
          <el-button type="primary" :icon="Plus">新增角色</el-button>
        </div>
      </template>

      <el-table :data="roleList" border style="width: 100%">
        <el-table-column type="index" width="50" label="序号" />
        <el-table-column prop="name" label="角色名称" />
        <el-table-column prop="code" label="角色编码" />
        <el-table-column prop="description" label="描述" show-overflow-tooltip />
        <el-table-column prop="status" label="状态" width="100">
          <template #default="{ row }">
            <el-tag :type="row.status === '1' ? 'success' : 'danger'">
              {{ row.status === '1' ? '启用' : '禁用' }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="createTime" label="创建时间" width="180" />
        <el-table-column label="操作" width="200" fixed="right">
          <template #default="{ row }">
            <el-button type="primary" link :icon="Edit" @click="handleEdit(row)">编辑</el-button>
            <el-button type="danger" link :icon="Delete" @click="handleDelete(row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Plus, Edit, Delete } from '@element-plus/icons-vue'
import { ElMessage, ElMessageBox } from 'element-plus'

const roleList = ref([
  {
    id: 1,
    name: '超级管理员',
    code: 'admin',
    description: '系统最高权限，可操作所有功能',
    status: '1',
    createTime: '2026-01-01 10:00:00'
  },
  {
    id: 2,
    name: '普通用户',
    code: 'user',
    description: '只能查看和编辑自己的数据',
    status: '1',
    createTime: '2026-02-15 14:30:00'
  },
  {
    id: 3,
    name: '访客',
    code: 'guest',
    description: '仅拥有查看权限',
    status: '1',
    createTime: '2026-03-10 09:15:00'
  },
  {
    id: 4,
    name: '测试角色',
    code: 'test',
    description: '用于测试环境的临时角色',
    status: '0',
    createTime: '2026-04-05 16:45:00'
  }
])

function handleEdit(row: any) {
  ElMessage.info(`编辑角色: ${row.name}`)
}

function handleDelete(row: any) {
  ElMessageBox.confirm(`确定删除角色 "${row.name}" 吗？`, '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    ElMessage.success('删除成功')
  }).catch(() => {})
}
</script>

<style scoped>
.role-container {
  padding: 10px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
