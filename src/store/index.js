import Vue from 'vue'
import Vuex from 'vuex'

import mutations from './mutations'
import actions from './actions'

Vue.use(Vuex)

const state = {
  token: sessionStorage.getItem('token'),
  userId: sessionStorage.getItem('userId')
}

export default new Vuex.Store({
  state,
  mutations,
  actions
})
