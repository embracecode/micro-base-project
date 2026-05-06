<template>
  <div class="dashboard-container">
    <el-row :gutter="20">
      <el-col :span="6">
        <el-card shadow="hover">
          <div class="card-panel">
            <div class="card-panel-icon" style="color: #409eff;">
              <el-icon :size="40"><User /></el-icon>
            </div>
            <div class="card-panel-description">
              <div class="card-panel-text">用户总数</div>
              <div class="card-panel-num">1,234</div>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="hover">
          <div class="card-panel">
            <div class="card-panel-icon" style="color: #67c23a;">
              <el-icon :size="40"><Goods /></el-icon>
            </div>
            <div class="card-panel-description">
              <div class="card-panel-text">订单数量</div>
              <div class="card-panel-num">5,678</div>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="hover">
          <div class="card-panel">
            <div class="card-panel-icon" style="color: #e6a23c;">
              <el-icon :size="40"><Money /></el-icon>
            </div>
            <div class="card-panel-description">
              <div class="card-panel-text">成交金额</div>
              <div class="card-panel-num">￥98,760</div>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="hover">
          <div class="card-panel">
            <div class="card-panel-icon" style="color: #f56c6c;">
              <el-icon :size="40"><Warning /></el-icon>
            </div>
            <div class="card-panel-description">
              <div class="card-panel-text">待处理告警</div>
              <div class="card-panel-num">12</div>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <el-row :gutter="20" style="margin-top: 20px;">
      <el-col :span="12">
        <el-card>
          <template #header>
            <span>最近活动</span>
          </template>
          <el-timeline>
            <el-timeline-item timestamp="2026-04-28" placement="top">
              <el-card>
                <h4>系统更新</h4>
                <p>Vue3 后台管理系统 v1.0 发布</p>
              </el-card>
            </el-timeline-item>
            <el-timeline-item timestamp="2026-04-25" placement="top">
              <el-card>
                <h4>新增用户</h4>
                <p>新增注册用户 128 人</p>
              </el-card>
            </el-timeline-item>
            <el-timeline-item timestamp="2026-04-20" placement="top">
              <el-card>
                <h4>数据备份</h4>
                <p>完成全量数据备份</p>
              </el-card>
            </el-timeline-item>
          </el-timeline>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card>
          <template #header>
            <span>系统公告</span>
          </template>
          <el-table :data="noticeList" style="width: 100%">
            <el-table-column prop="title" label="标题" />
            <el-table-column prop="date" label="日期" width="120" />
            <el-table-column prop="type" label="类型" width="100">
              <template #default="{ row }">
                <el-tag :type="row.tagType">{{ row.type }}</el-tag>
              </template>
            </el-table-column>
          </el-table>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { User, Goods, Money, Warning } from '@element-plus/icons-vue'

const noticeList = [
  { title: '系统将于今晚进行维护升级', date: '2026-04-28', type: '通知', tagType: 'primary' as const },
  { title: '新功能上线：动态表单支持', date: '2026-04-27', type: '更新', tagType: 'success' as const },
  { title: '安全漏洞修复说明', date: '2026-04-26', type: '安全', tagType: 'danger' as const },
  { title: '五一假期值班安排', date: '2026-04-25', type: '通知', tagType: 'warning' as const }
]
</script>

<style scoped>
.dashboard-container {
  padding: 10px;
}

.card-panel {
  display: flex;
  align-items: center;
}

.card-panel-icon {
  margin-right: 16px;
}

.card-panel-text {
  color: #909399;
  font-size: 14px;
  margin-bottom: 8px;
}

.card-panel-num {
  font-size: 24px;
  font-weight: bold;
  color: #303133;
}

h4 {
  margin: 0 0 8px;
  font-size: 16px;
}

p {
  margin: 0;
  color: #606266;
  font-size: 14px;
}
</style>
