<template>
  <div class="">
    <el-card class="login-card">
      <div class="tabs">
        <el-tabs v-model="activeName" stretch>
          <!-- 账号登录 -->
          <el-tab-pane label="" name="account">
            <template #label>
              <div class="flex-center-center">
                <el-icon><UserFilled /></el-icon>
                <span style="margin-left: 10px">账号登录</span>
              </div>
            </template>
            <PanelAccount ref="accountRef" />
          </el-tab-pane>

          <!-- 手机登录 -->
          <el-tab-pane v-if="false" label="手机登录" name="phone">
            <template #label>
              <div class="flex-center-center">
                <el-icon><Iphone /></el-icon>
                <span style="margin-left: 10px">手机登录</span>
              </div>
            </template>
            <PanelPhone ref="phoneRef" />
          </el-tab-pane>
        </el-tabs>
      </div>

      <div class="controls flex-sb-center">
        <el-checkbox v-model="isRemPwd" label="记住密码" size="large"></el-checkbox>
        <!-- <el-link type="primary">忘记密码</el-link> -->
      </div>

      <div>
        <el-button type="primary" size="large" class="login-btn" @click="handleLoginBtnClick">
          立即登录
        </el-button>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import PanelAccount from './panel-account.vue'
import PanelPhone from './panel-phone.vue'
import { LocalCache } from '@/utils/cache'

const isRemPwd = ref<boolean>(LocalCache.getCache('isRemPwd') ? true : false)
watch(isRemPwd, (newValue) => {
  LocalCache.setCache('isRemPwd', newValue)
  console.log(newValue)
})

const activeName = ref<string>('account')

const accountRef = ref<InstanceType<typeof PanelAccount>>()
const phoneRef = ref<InstanceType<typeof PanelPhone>>()

function handleLoginBtnClick() {
  if (activeName.value === 'account') {
    accountRef.value?.loginAction(isRemPwd.value)
  } else {
    phoneRef.value?.loginAction()
  }
}
</script>

<style lang="less" scoped>
.login-card {
  width: 400px;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.login-btn {
  width: 100%;
}
</style>
