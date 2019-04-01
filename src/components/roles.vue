<template>
  <div class="usermageement">
   <my-bread secondnav="权限管理" threenav="角色列表"></my-bread>
    <!-- 按钮 -->
    <el-row>
      <el-col :span="12" class="inputroles">
        <el-button  plain @click="addVisible = true">添加角色</el-button>
      </el-col>
      <!-- 表格 -->
      <el-table  :data="roleList" style="width: 100%" border>
        <el-table-column type="index" width="50"></el-table-column>
        <el-table-column prop="username" label="角色姓名" width="300"></el-table-column>
        <el-table-column prop="email" label="角色描述" width="300"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleEdit(scope.$index, scope.row)"
              plain
              icon="el-icon-edit"
            ></el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)"
              plain
              icon="el-icon-delete"
            ></el-button>
            <el-button
              size="mini"
              @click="handleAllot(scope.$index, scope.row)"
              plain
              icon="el-icon-check"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-row>
   
  
  
  </div>
</template>

<script>
export default {
  data() {
    return {
     addVisible:false,
     roleList:[{},{}],
   
     
      
  };
  },
  methods: {
    // 分页器的函数
 
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
