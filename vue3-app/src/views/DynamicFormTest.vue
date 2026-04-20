<template>
  <div class="dynamic-form-test">
    <h1>动态表单测试</h1>
    <DynamicForm
      v-model="formData"
      :form-config="formConfig"
      :rules="formRules"
      @submit="handleSubmit"
      @button-click="handleButtonClick"
    />
    <div class="form-result" v-if="submittedData">
      <h2>提交结果</h2>
      <pre>{{ submittedData }}</pre>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, h } from 'vue'
import DynamicForm from '../components/DynamicForm.vue'
import HelloWorld from '../components/HelloWorld.vue'

// 导入FormItem类型
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

// 函数式组件
const FunctionalComponent = (props: any, { emit }: any) => {
  const handleClick = () => {
    emit('update:modelValue', `点击时间: ${new Date().toLocaleString()}`)
  }
  return h('div', {
    class: 'functional-component'
  }, [
    h('el-button', {
      type: 'success',
      onClick: handleClick
    }, '点击我更新值'),
    h('div', {
      style: { marginTop: '10px' }
    }, `当前值: ${props.modelValue}`)
  ])
}
FunctionalComponent.props = ['modelValue']
FunctionalComponent.emits = ['update:modelValue']

// 表单配置
const formConfig: FormItem[] = [
  {
    type: 'input',
    field: 'username',
    key: 'username',
    label: '用户名',
    props: {
      placeholder: '请输入用户名',
      maxlength: 20
    },
    hidden: false,
    span: 12
  },
  {
    type: 'input',
    field: 'password',
    key: 'password',
    label: '密码',
    props: {
      type: 'password',
      placeholder: '请输入密码',
      showPassword: true
    },
    hidden: formData => formData.username === 'admin',
    span: 12
  },
  {
    type: 'datepicker',
    field: 'birthday',
    key: 'birthday',
    label: '出生日期',
    props: {
      type: 'date',
      placeholder: '请选择出生日期',
      format: 'YYYY-MM-DD'
    },
    hidden: false
  },
  {
    type: 'select',
    field: 'gender',
    key: 'gender',
    label: '性别',
    props: {
      placeholder: '请选择性别'
    },
    options: [
      { label: '男', value: 'male' },
      { label: '女', value: 'female' }
    ],
    hidden: false
  },
  {
    type: 'cascader',
    field: 'address',
    key: 'address',
    label: '地址',
    props: {
      options: [
        {
          value: 'beijing',
          label: '北京',
          children: [
            {
              value: 'chaoyang',
              label: '朝阳区'
            },
            {
              value: 'haidian',
              label: '海淀区'
            }
          ]
        },
        {
          value: 'shanghai',
          label: '上海',
          children: [
            {
              value: 'pudong',
              label: '浦东新区'
            },
            {
              value: 'minhang',
              label: '闵行区'
            }
          ]
        }
      ],
      placeholder: '请选择地址'
    },
    hidden: false
  },
  {
    type: 'checkbox',
    field: 'agree',
    key: 'agree',
    label: '同意协议',
    hidden: false
  },
  {
    type: 'checkbox-group',
    field: 'hobbies',
    key: 'hobbies',
    label: '爱好',
    options: [
      { label: '读书', value: 'reading' },
      { label: '运动', value: 'sports' },
      { label: '旅游', value: 'travel' }
    ],
    hidden: false
  },
  {
    type: 'radio-group',
    field: 'education',
    key: 'education',
    label: '学历',
    options: [
      { label: '高中', value: 'high school' },
      { label: '大学', value: 'college' },
      { label: '研究生', value: 'graduate' }
    ],
    hidden: false
  },
  {
    type: 'button',
    field: 'reset',
    key: 'reset',
    label: '自定义重置',
    props: {
      type: 'info'
    },
    hidden: false
  },
  {
    type: 'input',
    field: 'conditionalInput',
    key: 'conditionalInput',
    label: '条件输入',
    props: {
      placeholder: '只有同意协议后才显示'
    },
    hidden: (formData) => !formData.agree
  },
  {
    type: HelloWorld,
    field: 'HelloWorld',
    key: 'HelloWorld',
    label: '自定义组件',
    hidden: false
  },
  {
    type: FunctionalComponent,
    field: 'functionalComponent',
    key: 'functionalComponent',
    label: '函数式组件',
    hidden: false
  }
]

// 表单数据
const formData = reactive<Record<string, any>>({
  username: '',
  password: '',
  birthday: '',
  gender: '',
  address: [],
  agree: false,
  hobbies: [],
  education: '',
  conditionalInput: '',
  functionalComponent: ''
})

// 表单验证规则
const formRules = reactive({
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, message: '密码长度至少 6 个字符', trigger: 'blur' }
  ],
  birthday: [
    { required: true, message: '请选择出生日期', trigger: 'change' }
  ],
  gender: [
    { required: true, message: '请选择性别', trigger: 'change' }
  ],
  address: [
    { required: true, message: '请选择地址', trigger: 'change' }
  ],
  agree: [
    { required: true, message: '请同意协议', trigger: 'change' }
  ],
  hobbies: [
    { required: true, message: '请选择至少一个爱好', trigger: 'change' }
  ],
  education: [
    { required: true, message: '请选择学历', trigger: 'change' }
  ],
  conditionalInput: [
    { required: true, message: '请输入条件输入', trigger: 'blur' }
  ],
  customComponent: [
    { required: true, message: '请输入自定义组件', trigger: 'blur' }
  ],
  functionalComponent: [
    { required: true, message: '请点击函数式组件按钮', trigger: 'blur' }
  ]
})

// 提交结果
const submittedData = ref<Record<string, any> | null>(null)

// 处理表单提交
const handleSubmit = (data: Record<string, any>) => {
  console.log('表单提交数据:', data)
  submittedData.value = data
}

// 处理按钮点击
const handleButtonClick = (item: FormItem) => {
  console.log('按钮点击:', item)
  if (item.field === 'reset') {
    // 重置表单数据
    Object.keys(formData).forEach((key: string) => {
      if (Array.isArray(formData[key])) {
        formData[key] = []
      } else if (typeof formData[key] === 'boolean') {
        formData[key] = false
      } else {
        formData[key] = ''
      }
    })
  }
}
</script>

<style scoped>
.dynamic-form-test {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.form-result {
  margin-top: 30px;
  padding: 20px;
  border: 1px solid #e4e7ed;
  border-radius: 4px;
  background-color: #f5f7fa;
}

pre {
  white-space: pre-wrap;
  font-family: 'Courier New', Courier, monospace;
}
</style>