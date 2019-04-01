<template>
  <div class="usermageement">
   <my-bread secondnav="权限管理" threenav="权限列表"></my-bread>
    <!-- 搜索栏和按钮 -->
    <el-row>
      <!-- 表格 -->
      <el-table :data="rightList" style="width: 100%" border>
        <el-table-column type="index" width="50"></el-table-column>
        <el-table-column prop="username" label="权限名称" width="180"></el-table-column>
        <el-table-column prop="email" label="路径" width="180"></el-table-column>
        <el-table-column prop="mobile" label="层级"></el-table-column>
        
         
      </el-table>
    </el-row>
  </div>
</template>

<script>
  export default {
    data(){
      return {
        rightList:[{},{}],
      }
    }
  }
</script>

<style  lang="scss" scoped="" type="text/css">
.usermageement {
  background-color: #e9eef3;
 
  .inputcontent {
    padding-left: 10px;
  }
}
</style>
