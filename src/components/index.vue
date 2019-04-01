<template>
  <!-- 最外层的大容器 -->
  <el-container class="index-container">
    <!-- 顶部通栏 -->
    <el-header class="my-header">
      <el-row >
        <el-col :span="4">
          <div class="grid-content bg-purple">
              <img src="../assets/logo.png" alt="">
          </div>
        </el-col>
        <el-col :span="18">
          <div class="grid-content bg-purple-light">
              <h2 class="titlecenter">牛逼的后台管理系统</h2>
          </div>
        </el-col>
        <el-col :span="2">
          <div class="grid-content bg-purple">
                <el-button type="danger" plain @click="logout">退出登陆</el-button>
          </div>
        </el-col>
      </el-row>
    </el-header>
    <!-- 下部容器 -->
    <el-container class="my-container">
      <!-- 左侧容器 -->
      <el-aside width="200px" class="leftaside">
          <!-- 折叠导航栏 -->
     <el-menu router
      default-active="2"
      class="el-menu-vertical-demo"
      >
      <el-submenu :index="item.id +'' " v-for="item in menulist">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>{{item.authName}}</span>
        </template>
        <el-menu-item-group v-for="its in item.children">
             <el-menu-item :index="its.path">
                 <span class="el-icon-setting"></span>
                 {{its.authName}}
              </el-menu-item>
        </el-menu-item-group>
      </el-submenu>
     
    </el-menu>
      </el-aside>
      <!-- 右侧容器 -->
      <el-main class="rightaside">
          <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  name:"index",
  data() {
    return {
      menulist:[],
    }
  },
  methods: {
    logout(){
      window.sessionStorage.removeItem("token");
      this.$router.push("/login");
    }
  },
  beforeCreate() {
    if( window.sessionStorage.getItem("token")){

    }else{
       this.$message.error("请先登录！");
      this.$router.push("/login");
    }
  },
  async created() {
   let res = await this.$axios.get('menus');

   this.menulist = res.data.data;
    this.$router.push("users");
  },
};

</script>

<style lang="scss" scoped="" type="text/css">
    .index-container{
        display: flex;
        flex-direction: column;
        height: 100%;
        .my-header{
            height: 60px;
            background-color: #bbccdd;
             line-height: 60px;
            .titlecenter{
                margin: 0;
                padding: 0;
                text-align: center;
            }
           

        }
        .my-container{
            flex: 1;
            .leftaside{
                background-color: red;
            }
            .rightaside{
                background-color:#b3c0d1;
                padding-left: 10px;
            }
        }
    }
</style>