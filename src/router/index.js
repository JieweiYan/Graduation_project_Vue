import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'index',
        component: () => import('../views/index.vue'),
        redirect: 'home',
        children: [
            {
                path: 'home',
                name: '首页',
                component: () => import('../views/header/home')
            },
            {
                path: 'search',
                name: '搜索',
                redirect: '/search/searchpost',
                component: () => import('../views/search/search'),
                children: [
                    {
                        path: '/search/searchpost',
                        name: '搜索帖子',
                        component: () => import('../views/search/searchpost'),
                    },
                    {
                        path: '/search/searchpeople',
                        name: '搜索人',
                        component: () => import('../views/search/searchpeople'),
                    }
                ]
            },
            {
                path: 'forum',
                name: '论坛',
                component: () => import('../views/forum/forum'),
                redirect: '/forum/read',
                children: [
                    {
                        path: '/forum/read',
                        name: '看帖',
                        component: () => import('../views/forum/read')
                    },
                    {
                        path: '/forum/readpost',
                        name: '看帖子内容',
                        component: () => import('../views/forum/readpost')
                    },
                    {
                        path: '/forum/boutique',
                        name: '精品',
                        component: () => import('../views/forum/boutique')
                    }
                ]
            },
            {
                path: '/addresslist',
                name: '通讯录',
                redirect: '/addresslist/chatroom',
                component: () => import('../views/addresslist/addresslist'),
                children: [
                    {
                        path: '/addresslist/chatroom',
                        name: '聊天室',
                        component: () => import('../views/addresslist/chatroom')
                    },
                    {
                        path: '/addresslist/classalbum',
                        name: '班级相册',
                        component: () => import('../views/addresslist/classalbum')
                    },
                ]
            },
            {
                path: 'activity',
                name: '活动',
                component: () => import('../views/header/activity')
            },
            {
                path: 'usercenter',
                name: '个人中心',
                redirect: '/usercenter/post',
                component: () => import('../views/usercenter/usercenter'),
                children: [
                    {
                        path: '/usercenter/post',
                        name: '发帖',
                        component: () => import("../views/usercenter/post")
                    },
                    {
                        path: '/usercenter/reply',
                        name: '回复',
                        component: () => import("../views/usercenter/reply")
                    },
                    {
                        path: '/usercenter/album',
                        name: '相册',
                        component: () => import("../views/usercenter/album")
                    },
                ]
            },
            {
                path: 'usersetting',
                name: '个人设置',
                redirect: '/usersetting/changeinfo',
                component: () => import('../views/usersetting/usersetting'),
                children: [

                    {
                        path: '/usersetting/changeinfo',
                        name: '修改个人信息',
                        component: () => import('../views/usersetting/changeinfo')
                    },
                    {
                        path: '/usersetting/changeavatar',
                        name: '修改头像',
                        component: () => import('../views/usersetting/changeavatar')
                    },
                    {
                        path: '/usersetting/changepwd',
                        name: '修改密码',
                        component: () => import('../views/usersetting/changepwd')
                    },
                    {
                        path: '/usersetting/justflash',
                        name: '强制刷新页面',
                        component: () => import('../views/usersetting/justflash')
                    },
                ]
            },

        ]
    },
    {
        path: "/register",
        name: "注册",
        component: () => import('../views/register/register')
    },
    {
        path: "/login",
        name: "登录",
        component: () => import('../views/register/login')
    },

    {
        path: "/test",
        name: "test",
        component: () => import('../views/test')
    },
    {
        path: "/test2",
        name: "test2",
        component: () => import('../views/test2')
    },

]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes

})

//挂载路由导航守卫
router.beforeEach((to,from,next)=>{
    //to将要访问
    // from从哪儿访问
    // next接下来要干的事情（访问to路径）

    //如果访问的是登录页面，直接放行
    if(to.path == '/login' || to.path == '/register') {
        if(!window.localStorage.getItem("id")){
            return next()
        }
        else
            return next('home')
    }
    const id =  window.localStorage.getItem("id")//取出user
    if(!id) return next('login')//如果取出为空，说明还没登录，直接重定向到登录页面
    next();//符合要求，直接放行
})

export default router
