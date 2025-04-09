<template>
  <div class="router-tab">
    <el-breadcrumb :separator-icon="ArrowRight">
      <template v-for="item in breadcrumbs" :key="item.path">
        <el-breadcrumb-item :to="{ path: item.path }">{{ item.name }}</el-breadcrumb-item>
      </template>
    </el-breadcrumb>
  </div>
</template>

<script setup lang="ts">
import useLoginStore from '@/store/login/login'
import { mapPathToBreadcrumbs } from '@/utils/router'
import { ArrowRight } from '@element-plus/icons-vue'
import { computed } from 'vue'
import { useRoute } from 'vue-router'
const route = useRoute()
const userMenu = useLoginStore().userMenu
const breadcrumbs = computed(() => {
  return mapPathToBreadcrumbs(route.path, userMenu)
})
</script>

<style lang="less" scoped>
.router-tab {
  background-color: white;
  padding: 15px;
}
</style>
