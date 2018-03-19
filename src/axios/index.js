import axios from 'axios'
import store from '../store'
import router from '../router'

// 设置全局axios默认值
axios.defaults.timeout = 5000 // 5000的超时验证
axios.defaults.headers.post['Content-Type'] = 'application/jsoncharset=UTF-8'

// 创建一个axios实例
const instance = axios.create()
instance.defaults.headers.post['Content-Type'] = 'application/jsoncharset=UTF-8'

axios.interceptors.request.use = instance.interceptors.request.use

// http request 拦截器
instance.interceptors.request.use(
  config => {
    if (store.state.token) {
      config.headers.Authorization = `token ${store.state.token}`.replace(/(^")|("$)/g, '')
    }
    return config
  },
  error => {
    return Promise.reject(error)
  })

// http response 拦截器
instance.interceptors.response.use(
  response => {
    return response
  },
  error => {
    // return Promise.reject(error)
    if (error.response) {
      switch (error.response.status) {
        case 401:
          store.dispatch('UserLogout')
          router.replace({
            path: 'login',
            query: {
              redirect: router.currentRoute.fullPath
            }
          })
      }
    }
    return Promise.reject(error.response)
  })

export default {
  // 用户注册
  UserAdd (data) {
    return instance.post('/api/useradd', data)
  },
  // 用户登录
  UserLogin (data) {
    return instance.post('/api/login', data)
  },
  // 获取用户
  GetUser () {
    return instance.get('/api/getuser')
  },
  // 获取需求列表
  GetDemands () {
    return instance.get('/api/getdemands')
  },
  GetDemand (data) {
    return instance.post('/api/getdemand', data)
  },
  // 获取全部项目
  GetProjects () {
    return instance.get('/api/getprojects')
  },
  // 创建需求
  DemandAdd (data) {
    return instance.post('/api/demandadd', data)
  }
}
