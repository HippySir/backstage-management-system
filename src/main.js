import Vue from "vue";
import App from "./App.vue";

// 引入公共样式的文件
import "./assets/base.css";
Vue.config.productionTip = false;

// 导入路由
import router from "./router.js";

import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
Vue.use(ElementUI);

// 导入axios
import axios from "axios";
axios.defaults.baseURL = "http://localhost:8888/api/private/v1/";
Vue.prototype.$axios = axios;
// 设置基地址

// // 设置拦截器
axios.interceptors.request.use(
  function(config) {
    config.headers.Authorization = window.sessionStorage.getItem("token");
    return config;
  },
  function(error) {
  
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  function(response) {
    console.log(response);
   Vue.prototype.$message.success(response.data.meta.msg);
    return response;
  },
  function(error) {
    
    return Promise.reject(error);
  }
);

new Vue({
  el: "#app",
  render: h => h(App),
  router
});
