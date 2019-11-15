import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 底部菜单高亮
    menuShow: 0,
    // 搜索内容
    search_txt: ''
  },
  mutations: {
    changeMenu (state, n) {
      switch (n) {
        case 'index':
          state.menuShow = 0
          break
        case 'shopCart':
          state.menuShow = 1
          break
        case 'user':
          state.menuShow = 2
          break
        default:
          break
      }
    },
    searchTxt (state, n) {
      state.search_txt = n
    }
  },
  actions: {
  },
  modules: {
  }
})
