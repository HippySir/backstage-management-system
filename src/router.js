import Vue from 'vue';
import VueRouter from 'vue-router';
Vue.use(VueRouter);

// 导入组件
import login from './components/login.vue';
import index from './components/index.vue';
import users from './components/usermanagement.vue';
import roles from './components/roles.vue';
import rights from './components/rights.vue';
import goods from './components/goods.vue';
// 设置路由规则
const routes = [
    {path:'/',component:index,
    children:[
        {path:'users',component:users},
        {path:'roles',component:roles},
        {path:'rights',component:rights},
        {path:'goods',component:goods},
        {path:'',redirect:'users'},
    ]
    },
    
    {path:'/login',component:login},
  
]

// 实例化路由对象
const router = new VueRouter({
    routes
})

// 将实例化出来的路由对象暴露出去
export default router;