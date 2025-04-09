<template>
  <div class="sub-menu">
    <template v-for="item in menuList" :key="item.rule">
      <div v-if="item.children == null || item.children.length == 0">
        <el-menu-item :index="item.id" @click="routerEnter(item.path)">
          <el-icon><location /></el-icon>
          <template #title>
            <span v-show="!useSettingStore().isFold">{{ item.name }}</span>
          </template>
        </el-menu-item>
      </div>

      <div v-else>
        <el-sub-menu :class="{ 'hide-arrow': useSettingStore().isFold }" :index="item.id">
          <template #title>
            <el-icon><location /></el-icon>
            <span v-show="!useSettingStore().isFold">{{ item.name }}</span>
          </template>
          <subMenu :menuList="item.children"></subMenu>
        </el-sub-menu>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import router from '@/router'
import { defineProps } from 'vue'
import useSettingStore from '@/store/setting/setting'
import subMenu from '../subMenu/subMenu.vue'

interface Props {
  menuList: any[]
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const props = defineProps<Props>()

function routerEnter(path: string) {
  router.push(path)
}
</script>

<style lang="less" scoped>
.hide-arrow {
  ::v-deep .el-sub-menu__icon-arrow {
    display: none;
  }
}
.el-sub-menu {
  .el-menu-item {
    // background-color: rgb(32, 63, 109);
    padding-left: 50px !important;
  }

  .el-menu-item:hover {
    color: white;
  }
  .el-menu-item.is-active {
    background-color: rgb(127, 131, 136);
    color: white;
  }
}
</style>
