<template>
  <el-breadcrumb separator-class="el-icon-arrow-right" class="bread">
    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item>{{secondnav}}</el-breadcrumb-item>
    <el-breadcrumb-item>{{threenav}}</el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script>
export default {
    props:['secondnav','threenav'],
};
</script>

<style>
.bread {
  height: 50px;
  line-height: 50px;
  padding-left: 10px;
  padding-right: 0;
  background-color: #d3dce6;
}
</style>
