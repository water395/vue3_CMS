<template>
  <div class="pane-account">
    <el-form :model="phoneForm" :rules="phoneRules" label-width="60" status-icon ref="formRef">
      <el-form-item label="手机" prop="phone">
        <el-input v-model="phoneForm.phone" placeholder="请输入手机号码"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input
          v-model="phoneForm.password"
          type="password"
          placeholder="请输入密码"
          show-password
        ></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { phoneLogin } from '@/service/modules/login'
import { ElMessage, type ElForm, type FormRules } from 'element-plus'
import { reactive, ref } from 'vue'

const phoneForm = reactive({
  phone: '',
  password: ''
})

const formRef = ref<InstanceType<typeof ElForm>>()

const phoneRules: FormRules = {
  phone: [
    { required: true, message: '必须输入号码~', trigger: 'blur' },
    { pattern: /^[a-z0-9]{11,11}$/, message: '必须输入11位数字', trigger: 'change' }
  ],

  password: [
    { required: true, message: '必须输入密码~', trigger: 'blur' },
    { pattern: /^[a-z0-9]{6,6}$/, message: '必须输入6位数字或字母组成', trigger: 'change' }
  ]
}

function loginAction() {
  formRef.value?.validate((valid) => {
    if (valid) {
      const phone = phoneForm.phone
      const password = phoneForm.password
      phoneLogin({ username: phone, password: password })
        .then((res) => {
          console.log(res, '111')

          // if (res == 200) {
          //   ElMessage.success('Success,登录成功')
          // }
        })
        .catch((error) => {
          ElMessage.warning(error.message)
        })
    } else {
      ElMessage.error('Warn,请您输入正确的格式后再操作~~.')
    }
  })
}

defineExpose({
  loginAction
})
</script>

<style lang="less" scoped></style>
