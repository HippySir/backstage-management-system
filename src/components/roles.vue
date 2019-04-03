<template>
  <div class="usermageement">
    <my-bread secondnav="权限管理" threenav="角色列表"></my-bread>
    <!-- 按钮 -->
    <el-row>
      <el-col :span="12" class="inputroles">
        <el-button plain @click="addRoleVisible = true">添加角色</el-button>
      </el-col>
      <!-- 表格 -->
      <el-table
        :data="roleList"
        style="width: 100%"
        border
        highlight-current-row
        @current-change="handleCurrentChange"
      >
        <el-table-column type="index" width="50"></el-table-column>
        <el-table-column prop="roleName" label="角色姓名" width="300"></el-table-column>
        <el-table-column prop="roleDesc" label="角色描述" width="300"></el-table-column>
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
    <!-- 添加角色按钮的弹出框 -->
    <el-dialog title="添加角色" :visible.sync="addRoleVisible">
      <el-form :model="addRoleInfo" :rules="rolerules">
        <el-form-item label="角色名称" label-width="100px" prop="roleName">
          <el-input v-model="addRoleInfo.roleName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="角色描述" label-width="100px" prop="roleDesc">
          <el-input v-model="addRoleInfo.roleDesc" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addRoleVisible = false">取 消</el-button>
        <el-button type="primary" @click="addRoleoPeration">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 编辑角色的弹出框 -->
    <el-dialog title="添加角色" :visible.sync="editRoleVisible">
      <el-form :model="addRoleInfo" :rules="rolerules">
        <el-form-item label="角色名称" label-width="100px" prop="roleName">
          <el-input v-model="addRoleInfo.roleName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="角色描述" label-width="100px" prop="roleDesc">
          <el-input v-model="addRoleInfo.roleDesc" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editRoleVisible = false">取 消</el-button>
        <el-button type="primary" @click="editRoleoPeration">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 删除按钮的弹出框 -->
    <el-dialog title="温馨提示" :visible.sync="deleteroleVisible" width="50%">
      <span>你确定要删除码这个角色吗？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="deleteroleVisible = false">取 消</el-button>
        <el-button type="primary" @click="deleteRoleoperation">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 权限的弹出框-->
    <el-dialog title="权限分配" :visible.sync="rightcontrolVisible" width="30%">
      <el-tree
        default-expand-all
        :data="rightrole"
        show-checkbox
        node-key="id"
        :default-expanded-keys="[2, 3]"
        :default-checked-keys="[5]"
        
      ></el-tree>
      <span slot="footer" class="dialog-footer">
        <el-button @click="rightcontrolVisible = false">取 消</el-button>
        <el-button type="primary" @click="rightcontrole">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      // 添加角色的相关字段
      addRoleVisible: false,
      addRoleInfo: {
        roleName: "",
        roleDesc: ""
      },
      //  添加角色的校验规则
      rolerules: {
        roleName: [
          { required: true, message: "请输入角色名称", trigger: "blur" },
          { min: 3, max: 16, message: "长度在 3 到 16 个字符", trigger: "blur" }
        ],
        roleDesc: [
          { required: true, message: "请输入角色描述", trigger: "blur" },
          { min: 3, max: 18, message: "长度在 3 到 18 个字符", trigger: "blur" }
        ]
      },
      // 编辑角色的相关字段
      editRoleVisible: false,
      // 删除角色的相关字段
      deleteroleVisible: false,
      deleteroleInfo: {},
      roleList: [],
      // 编辑权限的相关字段
      rightcontrolVisible: false,
      // 权限分配的弹出框
      rightrole:[],
    };
  },
  methods: {
    // 获取角色列表的函数
    async getRoles() {
      let res = await this.$axios.get("roles");
      this.roleList = res.data.data;
      this.roleList.forEach(function(val) {
        delete val.children;
      });
    },
    // 表格中某行被选中的时候触发的函数
    handleCurrentChange() {},
    // 添加角色的时候触发的相关的函数
    async addRoleoPeration() {
      let res = await this.$axios.post("roles", this.addRoleInfo);
      this.getRoles();
      this.addRoleVisible = false;
    },
    // 编辑相应角色的函数
    async editRoleoPeration() {
      let res = await this.$axios.put(`roles/${this.addRoleInfo.id}`, {
        roleName: this.addRoleInfo.roleName,
        roleDesc: this.addRoleInfo.roleDesc
      });
      if (res.data.meta.status === 200) {
        this.getRoles();
      }
      this.editRoleVisible = false;
    },
    handleEdit(index, row) {
      this.editRoleVisible = true;
      this.addRoleInfo = row;
    },
    // 删除角色的相关的函数
    handleDelete(index, row) {
      this.deleteroleInfo = row;
      this.deleteroleVisible = true;
    },
    async deleteRoleoperation() {
      let res = await this.$axios.delete(`roles/${this.deleteroleInfo.id}`);

      if (res.data.meta.status === 200) {
        this.getRoles();
        alert("quni de ");
      }
      this.deleteroleVisible = false;
    },
    //权限分配的相关的函数
    async handleAllot() {
      this.rightcontrolVisible = true;
      let res = await this.$axios.get(`rights/tree`);
      console.log(res);
     this.processingdata(res.data.data);
     console.log(res.data.data);
     this.rightrole = res.data.data;
     
      
    },
    rightcontrole() {},
    // 处理数据的递归函数
    processingdata(num){
      num.forEach(val=>{
        val.label = val.authName;
        console.log(val);
        console.log(val.label);
        if(val.children!=undefined){
            this.processingdata(val.children);
        }
      })
    }
  },
  created() {
    // 页面加载进来的时候加载数据
    this.getRoles();
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
