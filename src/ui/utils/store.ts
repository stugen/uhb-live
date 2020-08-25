import Vue from 'vue'
import Vuex from 'vuex'
import { UserLogin } from './interfaces'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    chatUser: '',
    loginUser: { loggedIn: false } as UserLogin
  },
  mutations: {
    doLogout (state) {
      state.loginUser = { loggedIn: false }
    },
    setChatUser (state, name) {
      state.chatUser = name
    },
    setLoginData (state, loginData) {
      state.loginUser = loginData
    }
  }
})
