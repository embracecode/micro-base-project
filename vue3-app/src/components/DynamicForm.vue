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
          <!-- 自定义组件或函数式组件 -->
          <component
            v-if="typeof item.type === 'function' || typeof item.type === 'object'"
            :is="item.type"
            v-model="formData[item.field]"
            v-bind="item.props"
            v-on="item.events || {}"
            @vue:mounted="() => handleComponentMounted(item.key)"
          >
            <template v-for="(slot, name) in item.slots" :key="name" #[name]>
              {{ slot }}
            </template>
          </component>

          <!-- 按钮组件特殊处理 -->
          <component
            v-else-if="item.type === 'button'"
            :is="componentMap[item.type as ComponentType]"
            v-bind="item.props"
            @click="handleButtonClick(item)"
          >
            {{ item.label }}
          </component>

          <!-- 选择器类组件 -->
          <component
            v-else-if="item.type === 'select' || item.type === 'checkbox-group' || item.type === 'radio-group'"
            :is="dynamicComponents[item.type]"
            v-model="formData[item.field]"
            v-bind="item.props"
          >
            <!-- 选项 -->
            <template v-if="item.type === 'select'">
              <component
                v-for="option in item.options"
                :key="option.value"
                :is="dynamicComponents.option"
                :label="option.label"
                :value="option.value"
              />
            </template>
            <template v-else-if="item.type === 'checkbox-group'">
              <component
                v-for="option in item.options"
                :key="option.value"
                :is="dynamicComponents.checkbox"
                :label="option.value"
              >
                {{ option.label }}
              </component>
            </template>
            <template v-else-if="item.type === 'radio-group'">
              <component
                v-for="option in item.options"
                :key="option.value"
                :is="dynamicComponents.radio"
                :label="option.value"
              >
                {{ option.label }}
              </component>
            </template>
          </component>

          <!-- 其他基础组件 -->
          <component
            v-else-if="dynamicComponents[item.type]"
            :is="dynamicComponents[item.type]"
            v-model="formData[item.field]"
            v-bind="item.props"
            @vue:mounted="() => handleComponentMounted(item.key)"
          >
            <template v-for="(slot, name) in item.slots" :key="name" #[name]>
              {{ slot }}
            </template>
          </component>
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
import { ref, reactive, watch, computed, onMounted, defineAsyncComponent } from 'vue'
import { ElButton } from 'element-plus'

// 定义表单配置类型
interface FormItem {
  type: 'input' | 'button' | 'datepicker' | 'cascader' | 'select' | 'checkbox' | 'checkbox-group' | 'radio-group' | any
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

// 组件映射
type ComponentType = 'input' | 'button' | 'datepicker' | 'cascader' | 'select' | 'checkbox' | 'checkbox-group' | 'radio-group'

// 动态导入组件类型
type DynamicComponents = {
  [key: string]: any
}

// 动态导入组件
const dynamicComponents: DynamicComponents = {
  input: defineAsyncComponent(() => import('element-plus').then(m => m.ElInput)),
  datepicker: defineAsyncComponent(() => import('element-plus').then(m => m.ElDatePicker)),
  cascader: defineAsyncComponent(() => import('element-plus').then(m => m.ElCascader)),
  select: defineAsyncComponent(() => import('element-plus').then(m => m.ElSelect)),
  checkbox: defineAsyncComponent(() => import('element-plus').then(m => m.ElCheckbox)),
  'checkbox-group': defineAsyncComponent(() => import('element-plus').then(m => m.ElCheckboxGroup)),
  'radio-group': defineAsyncComponent(() => import('element-plus').then(m => m.ElRadioGroup)),
  option: defineAsyncComponent(() => import('element-plus').then(m => m.ElOption)),
  radio: defineAsyncComponent(() => import('element-plus').then(m => m.ElRadio))
}

// 组件映射
const componentMap: Record<ComponentType, any> = {
  input: dynamicComponents.input,
  button: ElButton,
  datepicker: dynamicComponents.datepicker,
  cascader: dynamicComponents.cascader,
  select: dynamicComponents.select,
  checkbox: dynamicComponents.checkbox,
  'checkbox-group': dynamicComponents['checkbox-group'],
  'radio-group': dynamicComponents['radio-group']
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

// 处理组件挂载完成
const handleComponentMounted = (key: string) => {
  emit('component-loaded', key)
}

// 组件挂载后发送组件加载完成事件
onMounted(() => {
  props.formConfig.forEach(item => {
    // 对于自定义组件或函数式组件，直接发送加载完成事件
    if (typeof item.type === 'function' || typeof item.type === 'object') {
      emit('component-loaded', item.key)
    }
  })
})

</script>

<style scoped>
/* 可以添加自定义样式 */
</style>