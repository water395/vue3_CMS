<template>
  <div class="common-layout">
    <el-container>
      <el-aside :width="useSettingStore().isFold ? '60px' : '200px'">
        <MainMenu />
      </el-aside>

      <el-container>
        <el-header height="40px"><MainHeader /></el-header>
        <el-main>
          <routerTab></routerTab>
          <div class="mainView">
            <router-view></router-view>
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import MainMenu from './components/mainMenu/mainMenu.vue'
import MainHeader from './components/mainHeader/mainHeader.vue'
import useSettingStore from '@/store/setting/setting'
import routerTab from './components/routerTab/routerTab.vue'
</script>

<style lang="less" scoped>
.el-container {
  height: 100vh;

  .el-aside {
    background: #273849;
    cursor: pointer;
    transition: width 0.3s linear;
  }

  .el-main {
    background-color: rgb(243, 242, 242);
    margin: 0;
    padding: 0;

    .mainView {
      padding: 10px;
    }
  }
}
</style>
