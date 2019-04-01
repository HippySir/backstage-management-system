<template>
  <div class="usermageement">
    <my-bread secondnav="商品管理" threenav="商品分类"></my-bread>
    <!-- 搜索栏和按钮 -->
    <el-row>
     
      <el-col :span="12" class="inputcontent">
        <el-button type="primary" plain >添加分类</el-button>
      </el-col>
      <!-- 表格 -->
      <el-table :data="categoryList" style="width: 100%" border>
       
        <el-table-column label="分类名称" width="180"></el-table-column>
        <el-table-column  label="级别" width="180"></el-table-column>
        <el-table-column  label="是否有效"></el-table-column>
        
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
      :page-size="1"
      layout="total, sizes, prev, pager, next, jumper"
      :total="1"
    ></el-pagination>
   
  </div>
</template>

<script>
    export default{
        data(){
            return{
                categoryList:[{},{}],
            }
        }
    };
  methods: {
  
   
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
