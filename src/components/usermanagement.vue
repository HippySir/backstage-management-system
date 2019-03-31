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
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
      </el-col>
      <el-col :span="12" class="inputcontent">
        <el-button type="primary" plain>主要按钮</el-button>
      </el-col>
      <!-- 表格 -->
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="date" label="日期" width="180"></el-table-column>
        <el-table-column prop="name" label="姓名" width="180"></el-table-column>
        <el-table-column prop="address" label="地址"></el-table-column>
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
      requireparam:{
        query:"",
        pagenum:1,
        pagesize:10,
      },
    };
  },
  methods: {
    
  },
  async created() {
    let res = await this.$axios.get('users',{
      params: this.requireparam,
       
      
    });
    console.log(res);
  },

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
