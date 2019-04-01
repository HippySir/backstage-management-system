<template>
  <div class="usermageement">
    <my-bread secondnav="订单编号" threenav="订单列表"></my-bread>
    <!-- 搜索栏和按钮 -->
    <el-row>
      <!-- 表格 -->
      <el-table :data="orderList" style="width: 100%" border>
        <el-table-column type="index" width="50"></el-table-column>
        <el-table-column label="订单编号" width="180"></el-table-column>
        <el-table-column label="订单价格" width="180"></el-table-column>
        <el-table-column label="是否付款">
          <template slot-scope="scope">
            <el-button
              type="danger"
              size="mini"
              @click="handleEdit(scope.$index, scope.row)"
              plain
            >未付款</el-button>
          </template>
        </el-table-column>
        <el-table-column label="是否发货"></el-table-column>
         <el-table-column label="下单时间"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleEdit(scope.$index, scope.row)"
              plain
               type="primary" 
              icon="el-icon-edit"
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
      :total="total"
    ></el-pagination>
  
  </div>
</template>

<script>
export default {
  data() {
    return {
    
      orderList: [{},{}],
     
    
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
