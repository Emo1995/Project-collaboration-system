import * as types from './types'

const mutations = {
  [types.LOGIN]: (state, data) => {
    try {
      sessionStorage.setItem('token', data)
      state.token = data
    } catch (err) {
      console.log(err)
    }
  },
  [types.LOGOUT]: (state) => {
    try {
      sessionStorage.removeItem('token')
      state.token = null
    } catch (err) {
      console.log(err)
    }
  },
  [types.USERID]: (state, data) => {
    try {
      sessionStorage.setItem('userId', data)
      state.userId = data
    } catch (err) {
      console.log(err)
    }
  }
}
export default mutations
