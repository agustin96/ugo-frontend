import {auth} from "@/plugins/firebase"

export const state = () => ({
  user: ''
});

export const mutations = {
  SET_USER(state, payload) {
    state.user = payload;
  },
};

export const actions = {
  saveUser({ commit }, payload) {
    commit("SET_USER", payload);
  },
  async logout({commit}) {
    console.log("logging out")
    await auth.signOut()
    location.href="/login"
  }
};
