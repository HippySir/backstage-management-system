<template>
  <div id="loginfirst">
    <div id="login">
      <el-form
        label-position="top"
        label-width="80px"
        :model="ruleLogin"
        :rules="rules"
        ref="ruleLogin"
      >
        <h2>用户登陆</h2>
        <el-form-item label="用户名" prop="username">
          <el-input v-model="ruleLogin.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="ruleLogin.password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitlogin('ruleLogin')">登陆</el-button>
          <el-button @click="resetLogin('ruleLogin')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      ruleLogin: {
        username: "",
        password: ""
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 4, max: 16, message: "长度在 4 到 16 个字符", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 5, max: 20, message: "长度在 5 到 20 个字符", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    submitlogin(ruleLogin) {
      this.$refs[ruleLogin].validate(valid => {
        if (valid) {
          alert("submit!");
        } else {
          this.$message({
            message: "验证没有通过！",
            type: "warning"
          });
          return false;
        }
      });
    },
    // 重置的方法
     resetLogin(ruleLogin) {
        this.$refs[ruleLogin].resetFields();
      },
  }
};
</script>

<style lang="scss" >
#loginfirst {
  background-color: #002b36;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  #login {
    width: 420px;
    height: 420px;
    background-color: #fff;
    padding: 35px;
    box-sizing: border-box;
    border-radius: 10px;
    // .el-form-item__content{
    //     button{
    //         width: 100%;
    //         background-color: #66b1ff;
    //     }
    // }
  }
}
</style>
