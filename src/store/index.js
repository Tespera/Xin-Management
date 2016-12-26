import Vue from 'vue'
import Vuex from 'vuex'
import * as getters from './getters'
import * as actions from './actions'
import * as mutations from './mutations'

Vue.use(Vuex)

const state = {
  baseURL: 'http://172.16.120.212:8080',
  baseImgURL: 'http://172.16.120.1'
  // baseImgURL: 'http://172.16.120.65:8080/carshop'
}

const store = new Vuex.Store({
  state,
  getters,
  actions,
  mutations
})

export default store
