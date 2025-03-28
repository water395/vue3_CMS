<template>
  <div class="common-layout">
    <el-container>
      <el-aside :width="useSettingStore().isFold ? '60px' : '200px'">
        <MainMenu />
      </el-aside>

      <el-container>
        <el-header height="40px"><MainHeader /></el-header>
        <!-- <el-header height="40px"><MainHeader /></el-header> -->
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import MainMenu from './components/mainMenu/mainMenu.vue'
import MainHeader from './components/mainHeader/mainHeader.vue'
import useSettingStore from '@/store/setting/setting'
</script>

<style lang="less" scoped>
.el-container {
  height: 100vh;

  .el-aside {
    background: #273849;
    cursor: pointer;
    transition: width 0.5s linear;
  }

  .el-main {
    background-color: rgb(192, 190, 190);
  }
}
</style>
