<template>
  <div class="usermageement">
   <my-bread secondnav="用角色理呀" threenav="用角色表呀"></my-bread>
    <!-- 搜索栏和按钮 -->
    <el-row>
      <el-col :span="12" class="inputcontent">
        <el-button type="primary" plain @click="addVisible = true">新增用户</el-button>
      </el-col>
      <!-- 表格 -->
      <el-table :data="userList" style="width: 100%" border>
        <el-table-column type="index" width="50"></el-table-column>
        <el-table-column prop="username" label="姓名" width="180"></el-table-column>
        <el-table-column prop="email" label="邮箱" width="180"></el-table-column>
        <el-table-column prop="mobile" label="电话"></el-table-column>
        <el-table-column prop="mg_state" label="用户状态">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.mg_state"
              active-color="#13ce66"
              inactive-color="#ff4949"
              @change="statuschange(scope.row,scope.$index)"
            ></el-switch>
          </template>
        </el-table-column>
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
