<template>
  <div class="main-menu">
    <div class="logo flex-center-center">
      <img class="img" src="@/assets/logo.svg" alt="" />
      <h2 v-show="!useSettingStore().isFold" class="title">后台管理系统</h2>
    </div>

    <div class="menu">
      <el-menu
        :default-active="defalutRoute"
        :collapse="useSettingStore().isFold"
        background-color="#3b556e"
        text-color="#b7bdc5"
      >
        <subMenu :menuList="userMenus"></subMenu>
      </el-menu>
    </div>
  </div>
</template>

<script setup lang="ts">
import useLoginStore from '@/store/login/login'
import useSettingStore from '@/store/setting/setting'
import subMenu from '../subMenu/subMenu.vue'
import { ref } from 'vue'
import { useRoute } from 'vue-router'
const userMenus: any = useLoginStore().userMenu

const route = useRoute()
const defalutRoute = ref(route.path)
</script>

<style lang="less" scoped>
.menu {
  height: calc(100vh - 40px);
  overflow: auto;

  .el-menu {
    overflow-y: auto;
    border-right: none;
    user-select: none;
    // background: rgb(57, 89, 136);
  }
}

.menu::-webkit-scrollbar {
  display: none;
}
.logo {
  height: 40px;
  overflow: hidden;
  padding: 10px;
  box-sizing: border-box;
  // background-color: aliceblue;

  .img {
    height: 100%;
    margin: 0 10px;
  }

  .title {
    font-size: 16px;
    font-weight: 700;
    color: white;
    white-space: nowrap;
  }
}
</style>
