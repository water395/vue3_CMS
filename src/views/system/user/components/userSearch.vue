<template>
  <div class="search">
    <el-form label-width="160px">
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="输入框">
            <el-input></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="下拉框">
            <el-select placeholder="please select your zone">
              <el-option label="Zone one" value="shanghai" />
              <el-option label="Zone two" value="beijing" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="用户名">
            <el-date-picker type="daterange" placeholder="Pick a date" style="width: 100%" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="输入框">
            <el-input></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="输入框">
            <el-input></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="输入框">
            <el-input></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="less" scoped>
.search {
  background-color: white;
  border-radius: 5px;
  padding: 10px;
  height: auto;
}
.el-form-item {
  margin-bottom: 10px;
}
</style>
