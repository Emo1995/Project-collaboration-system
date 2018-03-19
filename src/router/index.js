import Vue from 'vue'
import store from '@/store'
import Router from 'vue-router'
import Login from '@/pages/user/Login'
import Register from '@/pages/user/Register'
import * as types from '@/store/types.js'

import WorkTab from '@/pages/home/workTab'
import AllProject from '@/pages/home/allProject'
import MyProject from '@/pages/home/myProject'
import Knowledge from '@/pages/home/knowledge'
import CreateReq from '@/pages/home/createReq'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: {
        name: 'login'
      }
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/reg',
      name: 'reg',
      component: Register
    },
    {
      path: '/workTab',
      name: 'workTab',
      component: WorkTab,
      meta: {
        requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
      }
    },
    {
      path: '/allProject',
      name: 'allProject',
      component: AllProject,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/myProject',
      name: 'myProject',
      component: MyProject,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/knowledge/:did',
      name: 'knowledge',
      component: Knowledge,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/create',
      name: 'create',
      component: CreateReq,
      meta: {
        requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
      }
    }
  ]
})

// 页面刷新时，重新赋值token
if (sessionStorage.getItem('token')) {
  store.commit(types.LOGIN, sessionStorage.getItem('token'))
}

router.beforeEach((to, from, next) => {
  if (to.matched.some(r => r.meta.requireAuth)) { // 判断该路由是否需要登录权限
    if (store.state.token) { // 通过 vuex state 获取当前的 token 是否存在
      next()
    } else {
      next({
        path: '/login',
        query: {
          redirect: to.fullPath
        } // 将跳转的路由 path 作为参数，登录成功后跳转到该路由
      })
    }
  } else {
    next()
  }
})

export default router
