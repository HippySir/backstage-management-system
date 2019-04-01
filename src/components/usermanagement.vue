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
        <el-input
          placeholder="请输入内容"
          v-model="requireparam.query"
          class="input-with-select"
          @keyup.native.enter="searchUser"
        >
          <el-button slot="append" icon="el-icon-search" @click="searchUser"></el-button>
        </el-input>
      </el-col>
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
    <!-- 分页器 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="requireparam.pagenum"
      :page-sizes="[5, 10, 15, 18]"
      :page-size="requireparam.pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>
    <!-- 添加的弹出框 -->
    <el-dialog title="添加用户" :visible.sync="addVisible">
      <el-form :model="addform" :rules="addrules" ref="addform">
        <el-form-item label="用户名" label-width="120px" prop="username">
          <el-input v-model="addform.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" label-width="120px" prop="password">
          <el-input v-model="addform.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" label-width="120px" prop="email">
          <el-input v-model="addform.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话" label-width="120px" prop="mobile">
          <el-input v-model="addform.mobile" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitUserInfo('addform')">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 编辑的弹出框 -->
    <el-dialog title="修改用户" :visible.sync="editVisible">
      <el-form :model="editform" :rules="editrules" ref="editform">
        <el-form-item label="用户名" label-width="120px" prop="username">
          <el-input v-model="editform.username" autocomplete="off" disabled></el-input>
        </el-form-item>
        <el-form-item label="邮箱" label-width="120px" prop="email">
          <el-input v-model="editform.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话" label-width="120px" prop="mobile">
          <el-input v-model="editform.mobile" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editVisible = false">取 消</el-button>
        <el-button type="primary" @click="editUserInfo('editform')">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 分配角色弹出框 -->
    <el-dialog title="分配角色" :visible.sync="distributeVisible">
      <el-form :rules="addrules" ref="addform">
        <el-form-item label="用户名:" label-width="120px">
         {{ editRole.username}}
        </el-form-item>
        <!-- 下拉框 -->
        <el-select v-model="editRole.role_name" placeholder="请选择">
          <el-option
            v-for="item in roleList"
            :key="item.id"
            :label="item.roleName"
            :value="item.roleName"
          ></el-option>
        </el-select>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="distributeVisible = false">取 消</el-button>
        <el-button type="primary" @click="distributeUserInfo('addform')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 分页器的当前的分页
      requireparam: {
        query: "",
        pagenum: 1,
        pagesize: 5
      },
      userList: [],
      total: 0,
      // 弹出框是否弹出的字段
      addVisible: false,
      addform: {
        username: "hahah",
        password: 123456,
        email: "737338933@qq.com",
        mobile: 123456789456
      },
      // 表单验证的规则
      addrules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 4, max: 16, message: "长度在 4 到 16 个字符", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 3,
            max: 17,
            message: "长度在 3 到 17 个字符",
            trigger: "change"
          }
        ]
      },
      //  分配角色弹出框
      distributeVisible: false,
      roleList:[],
      editRole:{},

      // 编辑框是否显示的字段
      editVisible: false,
      editform: {
        username: "",
        email: "737338933@qq.com",
        mobile: 123456789456
      },
      //  编辑的规则
      editrules: {
        username: [{ required: true }]
      }
    };
  },
  methods: {
    // 分页器的函数
    handleSizeChange(val) {
      this.searchUser();
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.searchUser();
      console.log(`当前页: ${val}`);
    },
    // 分配角色的函数
   async handleAllot(index,row) {
      this.editRole = row;
      this.distributeVisible = true;
      let res = await this.$axios.get('roles');
      this.roleList = res.data.data;
     

    },
    // 编辑用户的函数
    async editUserInfo(data) {
      let res = await this.$axios.put(`users/${this.editform.id}`, {
        email: this.editform.email,
        mobile: this.editform.mobile
      });
      console.log(res);
      this.searchUser();
      this.editVisible = false;
    },
    // 新增用户信息的提交
    submitUserInfo(formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          let res = this.$axios.post("users", this.addform);
          this.searchUser();
        } else {
          this.$message.error("信息的输入的格式不正确，请重新输入！");
          return false;
        }
        this.addVisible = false;
      });
    },
    // 点击按钮的搜索函数
    async searchUser() {
      let res = await this.$axios.get("users", {
        params: this.requireparam
      });
      this.userList = res.data.data.users;

      this.total = res.data.data.total;
    },
    handleEdit(index, row) {
      this.editVisible = true;
      this.editform = row;
      console.log(index);
      console.log(row);
    },
    async handleDelete(index, row) {
      let res = await this.$axios.delete(`users/${row.id}`);
      if (res.data.meta.status === 200) {
        this.searchUser();
      }
      console.log(res);
      console.log(index);
      console.log(row);
    },
    switchEdit(index, row) {},
    // 用户状态改变的方法
    async statuschange(statuschange, index) {
      let res = await this.$axios.put(
        `users/${statuschange.id}/state/${statuschange.mg_state}`
      );
    }
    // 获取用户的信息的函数
  },
  async created() {
    this.searchUser();
    // let res = await this.$axios.get("users", {
    //   params: this.requireparam,

    // });
    // this.userList = res.data.data.users;
    // console.log(res);
    // this.total = res.data.data.total;
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
