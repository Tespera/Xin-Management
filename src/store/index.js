import Vue from 'vue'
import Vuex from 'vuex'
import * as getters from './getters'
import * as actions from './actions'
import * as mutations from './mutations'

Vue.use(Vuex)

const state = {
  baseURL: '',
  baseImgURL: '',
  // baseURL: 'http://59.110.5.105',
  // baseImgURL: 'http://59.110.5.105',
  logged: false
}

const store = new Vuex.Store({
  state,
  getters,
  actions,
  mutations
})

export default store
