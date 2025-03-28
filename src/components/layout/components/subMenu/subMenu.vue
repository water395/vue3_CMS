<template>
  <div class="sub-menu">
    <template v-for="item in menuList" :key="item.rule">
      <div v-if="item.children == null || item.children.length == 0">
        <el-menu-item @click="routerEnter(item.path)">
          {{ item.name }}
        </el-menu-item>
      </div>

      <div v-else>
        <el-sub-menu :index="item.rule">
          <template #title>
            <el-icon><location /></el-icon>
            <span>{{ item.name }}</span>
          </template>
          <subMenu :menuList="item.children"></subMenu>
        </el-sub-menu>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import router from '@/router'
import useLoginStore from '@/store/login/login'
import { defineProps } from 'vue'
// import subMenu from '../subMenu/subMenu.vue'

interface Props {
  menuList: any[]
}

const props = defineProps<Props>()

console.log(props)

const userMenus: any = useLoginStore().userMenu
function routerEnter(path: string) {
  console.log(path)
  router.push(path)
}
console.log(userMenus)
</script>

<style lang="less" scoped>
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
