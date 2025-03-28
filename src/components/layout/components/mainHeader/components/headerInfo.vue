<template>
  <div class="headr-info flex-center-center">
    <div class="info">
      <el-dropdown>
        <span class="el-dropdown-link">
          <el-avatar
            :size="20"
            src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
          ></el-avatar>
          <span class="name">Linqinqguan</span>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>个人中心</el-dropdown-item>
            <el-dropdown-item>设置</el-dropdown-item>
            <el-dropdown-item divided @click="outLogin">
              <el-icon><CircleClose /></el-icon>
              退出登录
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script setup lang="ts">
import userLoginStore from '@/store/login/login'
import { CircleClose } from '@element-plus/icons-vue'

function outLogin() {
  userLoginStore().outLogin()
}
</script>

<style lang="less" scoped>
.el-dropdown-link {
  outline: none;
  cursor: pointer;
  color: var(--el-color-primary);
  display: flex;

  align-items: center;
  .name {
    color: black;
    margin-left: 10px;
  }
  .name:hover {
    color: rgb(68, 96, 219);
  }
}
</style>
