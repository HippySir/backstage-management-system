<template>
  <div class="usermageement">
   <my-bread secondnav="商品列表" threenav="商品管理"></my-bread>
    <!-- 搜索栏和按钮 -->
    <el-row>
      <el-col :span="6">
        <el-input
          placeholder="请输入内容"
         
          class="input-with-select"
       
        >
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
      </el-col>
      <el-col :span="12" class="inputcontent">
        <el-button type="primary" plain >添加商品</el-button>
      </el-col>
      <!-- 表格 -->
      <el-table :data="goodsList" style="width: 100%" border>
        <el-table-column type="index" width="50"></el-table-column>
        <el-table-column  label="商品名称" width="180"></el-table-column>
        <el-table-column  label="商品价格（元）" width="180"></el-table-column>
        <el-table-column  label="商品重量"></el-table-column>
           <el-table-column  label="创建时间"></el-table-column>
       
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
          </template>
        </el-table-column>
      </el-table>
    </el-row>
    <!-- 分页器 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="1"
      :page-sizes="[5, 10, 15, 18]"
      :page-size="5"
      layout="total, sizes, prev, pager, next, jumper"
      :total="1"
    ></el-pagination>
   
  </div>
</template>

<script>
export default {
  data() {
    return {
      goodsList: [{},{}],
     
     
   
    };
  },
  methods: {
    // 分页器的函数
    handleSizeChange(val) {
     
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
    
      console.log(`当前页: ${val}`);
    },
  }
};
</script>

<style  lang="scss" scoped="" type="text/css">
.usermageement {
  background-color: #e9eef3;
 
  .inputcontent {
    padding-left: 10px;
  }
}
</style>
