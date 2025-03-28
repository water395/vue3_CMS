<template>
  <div class="main-menu">
    <div class="logo flex-center-center">
      <img class="img" src="@/assets/logo.svg" alt="" />
      <h2 v-show="!useSettingStore().isFold" class="title">后台管理系统</h2>
    </div>

    <div class="menu">
      <el-menu :collapse="useSettingStore().isFold" background-color="#3b556e" text-color="#b7bdc5">
        <!-- 遍历整个菜单 -->
        <template v-for="item in userMenus" :key="item.rule">
          <el-sub-menu :index="item.rule">
            <template #title>
              <el-icon><location /></el-icon>
              <span>{{ item.name }}</span>
            </template>

            <div v-if="item.children != null">
              <template v-for="subItem in item.children" :key="subItem.rule">
                <el-menu-item @click="routerEnter(subItem.path)">
                  {{ subItem.name }}
                </el-menu-item>
              </template>
            </div>
          </el-sub-menu>
        </template>
      </el-menu>
    </div>
  </div>
</template>

<script setup lang="ts">
import router from '@/router'
import useLoginStore from '@/store/login/login'
import useSettingStore from '@/store/setting/setting'

const userMenus: any = useLoginStore().userMenu
function routerEnter(path: string) {
  console.log(path)
  router.push(path)
}
console.log(userMenus)
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

  .el-sub-menu {
    background: #32485e;
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
