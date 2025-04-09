<template>
  <div class="main-header">
    <div class="menu-icon" @click="handleFoldClick">
      <el-icon size="20px">
        <component :is="useSettingStore().isFold ? 'Expand' : 'Fold'" />
      </el-icon>
    </div>

    <div class="header-content flex-sb-center">
      <div></div>
      <HeaderInfo />
    </div>
  </div>

  <div>
    <routerTab></routerTab>
  </div>
</template>

<script setup lang="ts">
import useSettingStore from '@/store/setting/setting'
import HeaderInfo from './components/headerInfo.vue'

function handleFoldClick() {
  useSettingStore().isFoldChance(!useSettingStore().isFold)
}
</script>

<style lang="less" scoped>
.main-header {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;

  .header-content {
    width: 100%;
    margin-left: 10px;
    height: 100%;
  }
}

.menu-icon {
  cursor: pointer;
}
</style>
