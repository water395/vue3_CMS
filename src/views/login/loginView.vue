<template>
  <div class="login-container flex-center-center">
    <!-- <h1 class="login-title">个人博客内容管理系统</h1> -->
    <loginPanel></loginPanel>
  </div>
</template>

<script setup lang="ts">
import loginPanel from './c-cpns/login-panel.vue'
</script>

<style scoped>
.login-container {
  height: 100vh;
  background-color: #f5f7fa;
  flex-direction: column;
  background-image: url('../../assets/image/login_bg.png'); /* 替换为你的图片路径 */
  background-size: 100% 140%;
  background-repeat: no-repeat;
  background-position: center;
}
.login-title {
  text-align: center;
  margin-bottom: 20px;
  color: #303133;
}
</style>
