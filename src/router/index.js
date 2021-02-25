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
        path:'forum',
        name:'论坛',
        component:()=>import('../views/header/forum')
      },
      {
        path:'directory',
        name:'通讯录',
        component:()=>import('../views/header/directory')
      },
      {
        path:'activity',
        name:'活动',
        component:()=>import('../views/header/activity')
      },
      {
        path:'usercenter',
        name:'个人中心',
        redirect:'/usercenter/post',
        component:()=>import('../views/usercenter/usercenter'),
        children: [
          {
            path: '/usercenter/post',
            name: '发帖',
            component:()=>import("../views/usercenter/post")
          },
          {
            path: '/usercenter/reply',
            name: '回复',
            component:()=>import("../views/usercenter/reply")
          },
          {
            path: '/usercenter/album',
            name: '相册',
            component:()=>import("../views/usercenter/album")
          },
        ]
      },
      {
        path:'usersetting',
        name:'个人设置',
        redirect:'/usersetting/changeinfo',
        component:()=>import('../views/usersetting/usersetting'),
        children:[

          {
            path:'/usersetting/changeinfo',
            name:'修改个人信息',
            component:()=>import('../views/usersetting/changeinfo')
          },
          {
            path:'/usersetting/changeavatar',
            name:'修改头像',
            component:()=>import('../views/usersetting/changeavatar')
          },
          {
            path:'/usersetting/changepwd',
            name:'修改密码',
            component:()=>import('../views/usersetting/changepwd')
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
