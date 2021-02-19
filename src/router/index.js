import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'index',
    component: () => import('../views/index.vue'),
    redirect:'home',
    children:[
      {
        path:'home',
        name:'首页',
        component:()=>import('../views/header/home')
      },
      {
        path:'activity',
        name:'活动',
        component:()=>import('../views/header/activity')
      },
      {
        path:'directory',
        name:'校友通讯录',
        component:()=>import('../views/header/directory')
      },
      {
        path:'forum',
        name:'论坛',
        component:()=>import('../views/header/forum')
      },
      {
        path:'user',
        name:'个人页面',
        component:()=>import('../views/user/user'),
        children:[
          {
            path:'usercenter',
            name:'个人中心',
            component:()=>import('../views/user/usercenter')
          },
          {
            path:'changepwd',
            name:'修改密码',
            component:()=>import('../views/user/changepwd')
          },
        ]
      },

    ]
  },
  {
    path: "/register",
    name:"注册",
    component:()=>import('../views/register/register')
  },
  {
    path: "/login",
    name:"登录",
    component:()=>import('../views/register/login')
  },
  {
    path: "/test",
    name:"test",
    component:()=>import('../views/test')
  },
  {
    path: "/test2",
    name:"test2",
    component:()=>import('../views/test2')
  },

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
