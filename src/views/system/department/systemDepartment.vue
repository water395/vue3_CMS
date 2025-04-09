<template>
  <div class="search">
    <div class="table">
      <el-table :data="departmentData.departmentList" border style="width: 100%">
        <el-table-column prop="department_id" label="部门id" />
        <el-table-column prop="department_name" label="部门名称" />
        <el-table-column prop="description" label="说明" />
        <el-table-column prop="create_time" label="创建时间" />
      </el-table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { departmentList } from '@/service/modules/department'
import { onMounted, reactive } from 'vue'

const departmentData = reactive({
  departmentList: []
})

onMounted(async () => {
  const res = await departmentList(1)
  departmentData.departmentList = res.data
})
</script>

<style lang="less" scoped></style>
