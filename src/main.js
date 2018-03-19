// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import store from './store'
import api from './axios'
import Editor from '@/components/editor'
import SideNav from '@/components/public/side-nav.vue'
import vFooter from '@/components/public/footer.vue'
import vHeader from '@/components/public/header.vue'

Vue.prototype.$api = api

import 'base-flex/dist/base.min.css'
import 'element-ui/lib/theme-chalk/index.css'

import ElementUI from 'element-ui'

Vue.use(Editor)
Vue.use(ElementUI)
Vue.component('v-header', vHeader)
Vue.component('side-nav', SideNav)
Vue.component('v-footer', vFooter)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: {
    App
  }
})
