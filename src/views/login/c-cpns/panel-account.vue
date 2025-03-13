<template>
  <div class="pane-account">
    <el-form :model="accountForm" :rules="accountRules" label-width="60" ref="formRef">
      <el-form-item label="账号" prop="account">
        <el-input v-model="accountForm.account" placeholder="请输入账号"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input
          v-model="accountForm.password"
          type="password"
          show-password
          placeholder="请输入密码"
        ></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { ElMessage, type ElForm, type FormRules } from 'element-plus'
import { reactive, ref } from 'vue'
import userLoginStore from '@/store/login/login'
import { LocalCache } from '@/utils/cache'

const accountForm = reactive({
  account: LocalCache.getCache('loginInfo')
    ? JSON.parse(LocalCache.getCache('loginInfo')).username
    : '',
  password: LocalCache.getCache('loginInfo')
    ? JSON.parse(LocalCache.getCache('loginInfo')).password
    : ''
})

console.log(LocalCache.getCache('loginInfo'))

const formRef = ref<InstanceType<typeof ElForm>>()

const accountRules: FormRules = {
  account: [
    { required: true, message: '必须输入账号~', trigger: 'blur' },
    { pattern: /^[a-z0-9]{6,20}$/, message: '必须输入6~20位数字或字母组成', trigger: 'change' }
  ],

  password: [
    { required: true, message: '必须输入密码~', trigger: 'blur' },
    { pattern: /^[a-z0-9]{6,}$/, message: '必须输入6位数字或字母组成', trigger: 'change' }
  ]
}

function loginAction(isRemPwd: boolean) {
  formRef.value?.validate((valid) => {
    if (valid) {
      const account = accountForm.account
      const password = accountForm.password
      userLoginStore().loginAccountAction({ username: account, password: password, isRemPwd })
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
