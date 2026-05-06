<template>
  <div class="user-container">
    <el-card>
      <template #header>
        <div class="card-header">
          <span>用户管理</span>
          <el-button type="primary" :icon="Plus">新增用户</el-button>
        </div>
      </template>

      <el-form :inline="true" :model="searchForm" class="search-form">
        <el-form-item label="用户名">
          <el-input v-model="searchForm.username" placeholder="请输入用户名" clearable />
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="searchForm.status" placeholder="请选择状态" clearable>
            <el-option label="启用" value="1" />
            <el-option label="禁用" value="0" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" :icon="Search" @click="handleSearch">查询</el-button>
          <el-button :icon="RefreshRight" @click="handleReset">重置</el-button>
        </el-form-item>
      </el-form>

      <el-table :data="userList" border style="width: 100%" v-loading="loading">
        <el-table-column type="index" width="50" label="序号" />
        <el-table-column prop="username" label="用户名" />
        <el-table-column prop="nickname" label="昵称" />
        <el-table-column prop="email" label="邮箱" />
        <el-table-column prop="phone" label="手机号" />
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

      <div class="pagination-wrapper">
        <el-pagination
          v-model:current-page="pagination.page"
          v-model:page-size="pagination.pageSize"
          :page-sizes="[10, 20, 50, 100]"
          :total="pagination.total"
          layout="total, sizes, prev, pager, next, jumper"
          @size-change="handleSizeChange"
          @current-change="handlePageChange"
        />
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { Plus, Search, RefreshRight, Edit, Delete } from '@element-plus/icons-vue'
import { ElMessage, ElMessageBox } from 'element-plus'

const loading = ref(false)

const searchForm = reactive({
  username: '',
  status: ''
})

const pagination = reactive({
  page: 1,
  pageSize: 10,
  total: 4
})

const userList = ref([
  {
    id: 1,
    username: 'admin',
    nickname: '管理员',
    email: 'admin@example.com',
    phone: '13800138000',
    status: '1',
    createTime: '2026-01-01 10:00:00'
  },
  {
    id: 2,
    username: 'zhangsan',
    nickname: '张三',
    email: 'zhangsan@example.com',
    phone: '13800138001',
    status: '1',
    createTime: '2026-02-15 14:30:00'
  },
  {
    id: 3,
    username: 'lisi',
    nickname: '李四',
    email: 'lisi@example.com',
    phone: '13800138002',
    status: '0',
    createTime: '2026-03-10 09:15:00'
  },
  {
    id: 4,
    username: 'wangwu',
    nickname: '王五',
    email: 'wangwu@example.com',
    phone: '13800138003',
    status: '1',
    createTime: '2026-04-05 16:45:00'
  }
])

function handleSearch() {
  ElMessage.success('查询成功')
}

function handleReset() {
  searchForm.username = ''
  searchForm.status = ''
  ElMessage.info('已重置')
}

function handleEdit(row: any) {
  ElMessage.info(`编辑用户: ${row.username}`)
}

function handleDelete(row: any) {
  ElMessageBox.confirm(`确定删除用户 "${row.username}" 吗？`, '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    ElMessage.success('删除成功')
  }).catch(() => {})
}

function handleSizeChange(val: number) {
  pagination.pageSize = val
  handleSearch()
}

function handlePageChange(val: number) {
  pagination.page = val
  handleSearch()
}
</script>

<style scoped>
.user-container {
  padding: 10px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.search-form {
  margin-bottom: 20px;
}

.pagination-wrapper {
  margin-top: 20px;
  display: flex;
  justify-content: flex-end;
}
</style>
