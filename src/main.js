import Vue from 'vue';
import App from './App.vue';

// 引入公共样式的文件
import './assets/base.css';
Vue.config.productionTip = false;

// 导入路由
import router from './router.js';

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

new Vue({
  el:"#app",
  render: h => h(App),
  router,
})
