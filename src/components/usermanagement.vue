<template>
  <div class="usermageement">
    <el-breadcrumb separator-class="el-icon-arrow-right" class="bread">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>活动管理</el-breadcrumb-item>
      <el-breadcrumb-item>活动列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 搜索栏和按钮 -->
    <el-row>
      <el-col :span="6">
        <el-input placeholder="请输入内容" v-model="requireparam.query" class="input-with-select">
          <el-button slot="append" icon="el-icon-search" @click="searchUser"></el-button>
        </el-input>
      </el-col>
      <el-col :span="12" class="inputcontent">
        <el-button type="primary" plain>主要按钮</el-button>
      </el-col>
      <!-- 表格 -->
      <el-table :data="userList" style="width: 100%" border>
        <el-table-column type="index" width="50"></el-table-column>
        <el-table-column prop="username" label="姓名" width="180"></el-table-column>
        <el-table-column prop="email" label="邮箱" width="180"></el-table-column>
        <el-table-column prop="mobile" label="电话"></el-table-column>
        <el-table-column prop="mg_state" label="用户状态">
          <template slot-scope="scope">
            <el-switch v-model="scope.row.mg_state" active-color="#13ce66" inactive-color="#ff4949"  @change="statuschange(scope.row,scope.$index)"></el-switch>
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
              @click="handleEdit(scope.$index, scope.row)"
              plain
              icon="el-icon-message"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-row>
    <!-- 分页器 -->
    <el-pagination
      :page-sizes="[100, 200, 300, 400]"
      :page-size="100"
      layout="total, sizes, prev, pager, next, jumper"
      :total="400"
    ></el-pagination>
  </div>
</template>

<script>
export default {
  data() {
    return {
      requireparam: {
        query: "",
        pagenum: 1,
        pagesize: 10
      },
      userList: [],
      total: 0,
     
    };
  },
  methods: {
    // 点击按钮的搜索函数
    searchUser(){
      console.log('nihao');
    },
    handleEdit(index, row) {
      console.log(index);
      console.log(row);
    },
    handleDelete(index, row) {
      console.log(index);
      console.log(row);
    },
    switchEdit(index,row){

    },
    // 用户状态改变的方法
    async statuschange(statuschange,index){
      let res = await this.$axios.put(`users/${statuschange.id}/state/${statuschange.mg_state}`);
    }
  },
  async created() {
    let res = await this.$axios.get("users", {
      params: this.requireparam,
    
    });
    this.userList = res.data.data.users;
    console.log(res);
    this.total = res.data.data.total;
  }
};
</script>

<style  lang="scss" scoped="" type="text/css">
.usermageement {
  background-color: #e9eef3;
  .bread {
    height: 50px;
    line-height: 50px;
    padding-left: 10px;
    padding-right: 0;
    background-color: #d3dce6;
  }
  .inputcontent {
    padding-left: 10px;
  }
}
</style>
