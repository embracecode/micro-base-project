<template>
  <el-form
    :model="formData"
    :rules="rules"
    ref="formRef"
    label-width="120px"
    @submit.prevent="handleSubmit"
  >
    <el-row :gutter="20">
      <el-col
        v-for="item in computedFormConfig"
        :key="item.key"
        :span="item.span || 24"
      >
        <el-form-item
          :label="item.label"
          :prop="item.field"
        >
          <!-- 直接使用组件标签，插件会自动处理异步加载 -->
          <template v-if="item.type !== 'ElButton'">
            <component
              :is="item.type"
              v-model="formData[item.field]"
              v-bind="item.props"
              v-on="item.events || {}"
            >
              <template v-if="item.type === 'ElSelect' && item.options">
                <el-option
                  v-for="option in item.options"
                  :key="option.value"
                  :label="option.label"
                  :value="option.value"
                />
              </template>
              <template v-else-if="item.type === 'ElCheckboxGroup' && item.options">
                <el-checkbox
                  v-for="option in item.options"
                  :key="option.value"
                  :label="option.value"
                >
                  {{ option.label }}
                </el-checkbox>
              </template>
              <template v-else-if="item.type === 'ElRadioGroup' && item.options">
                <el-radio
                  v-for="option in item.options"
                  :key="option.value"
                  :label="option.value"
                >
                  {{ option.label }}
                </el-radio>
              </template>
              <template v-for="(slot, name) in item.slots" :key="name" #[name]>
                {{ slot }}
              </template>
            </component>
          </template>
          <template v-else>
            <component
              :is="item.type"
              v-bind="item.props"
              @click="handleButtonClick(item)"
            >
              {{ item.label }}
            </component>
          </template>
        </el-form-item>
      </el-col>
    </el-row>

    <el-form-item>
      <el-button type="primary" native-type="submit">提交</el-button>
      <el-button @click="resetForm">重置</el-button>
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
import { ref, reactive, watch, computed } from 'vue'

// 定义表单配置类型
interface FormItem {
  type: string | any
  field: string
  key: string
  label: string
  props?: Record<string, any>
  slots?: Record<string, any>
  options?: Array<{ label: string; value: any }>
  hidden?: boolean | ((formData: Record<string, any>) => boolean)
  events?: Record<string, Function>
  span?: number
}

// 定义组件属性
const props = defineProps<{
  formConfig: FormItem[]
  modelValue?: Record<string, any>
  rules?: Record<string, any[]>
}>()

// 定义事件
const emit = defineEmits(['update:modelValue', 'submit', 'button-click', 'component-loaded'])

// 表单引用
const formRef = ref()

const computedFormConfig = computed(() => props.formConfig.filter((item) => !isHidden(item)))

const isHidden = (item: FormItem): boolean => {
  if (typeof item.hidden === 'function') {
    return item.hidden(formData)
  }
  return item.hidden !== false
}

// 表单数据
const formData = reactive<Record<string, any>>({ ...props.modelValue })

// 监听模型值变化
watch(
  () => props.modelValue,
  (newValue) => {
    Object.assign(formData, newValue)
  },
  { deep: true }
)

// 监听表单数据变化
watch(
  formData,
  (newValue) => {
    emit('update:modelValue', { ...newValue })
  },
  { deep: true }
)

// 提交表单
const handleSubmit = async () => {
  if (!formRef.value) return
  try {
    await formRef.value.validate()
    emit('submit', { ...formData })
  } catch (error) {
    console.error('表单验证失败:', error)
  }
}

// 重置表单
const resetForm = () => {
  if (formRef.value) {
    formRef.value.resetFields()
  }
}

// 处理按钮点击
const handleButtonClick = (item: FormItem) => {
  emit('button-click', item)
}
</script>

<style scoped>
/* 可以添加自定义样式 */
</style>