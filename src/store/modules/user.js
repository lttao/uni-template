import { SET_TOKEN, CLEAR_TOKEN } from '../mutation-types'
import { storageUtil } from '@/util'

const state = {
  token: storageUtil.getToken()
}

const getters = {
  token(state) {
    return state.token
  }
}

const mutations = {
  [SET_TOKEN](state, token) {
    state.token = token
    storageUtil.setToken(token)
  },
  [CLEAR_TOKEN](state) {
    state.token = null
    storageUtil.clearToken()
  }
}

const actions = {
  setToken({ commit }, token) {
    commit(SET_TOKEN, token)
  },
  clearToken({ commit }) {
    commit(CLEAR_TOKEN)
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
