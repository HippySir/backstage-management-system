import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false;
// 导入路由
import router from './router.js';
// 导入MUI组件
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

new Vue({
  el:"#app",
  render: h => h(App),
  router,
})
