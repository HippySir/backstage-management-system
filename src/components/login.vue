<template>
  <div id="loginfirst">
    <div id="login">
       
      <el-form label-position="top" label-width="80px">
           <h2>用户登陆</h2>
        <el-form-item label="用户名">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input></el-input>
        </el-form-item>
        <el-form-item>
          <el-button>重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
export default {};
</script>

<style lang="scss" >
#loginfirst {
    background-color:#002b36;
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
    .el-form-item__content{
        button{
            width: 100%;
            background-color: #66b1ff;
        }
    }
  }
}
</style>
