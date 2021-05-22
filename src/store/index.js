import { createStore } from 'vuex'
import login from "./modules/login"
import txt from "./modules/txt"
import user from "./modules/user"

export default createStore({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  getters: {},
  modules: {
    login,
    txt, user
  }
})
