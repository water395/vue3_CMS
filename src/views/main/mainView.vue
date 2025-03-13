<template>
  <div class="main">
    <button @click="userLoginStore().outLogin">退出登录</button>
  </div>
</template>

<script setup lang="ts">
import userLoginStore from '@/store/login/login'
</script>

<style lang="less" scoped></style>
