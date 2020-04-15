import { auth } from "@/plugins/firebase";

export const state = () => ({
  //articulos: "",
  //data: "",
  latitudes: null,
  mesas: null,
  rubros: null,
  sectores: null,
  user: ""
});

export const mutations = {
  INCREMENT_ARTICULO(state, payload) {
    state.articulos[payload].cantidad++;
  },
  DECREMENT_ARTICULO(state, payload) {
    if(state.articulos[payload].cantidad > 0) state.articulos[payload].cantidad--;
  },
  SET_ARTICULOS(state, payload) {
    state.articulos = payload;
  },
  SET_LATITUDES(state, payload) {
    state.latitudes = payload;
  },
  SET_DATA(state, payload) {
    state.data = payload;
  },
  SET_MESAS(state, payload) {
    state.mesas = payload;
  },
  SET_RUBROS(state, payload) {
    state.rubros = payload;
  },
  SET_SECTORES(state, payload) {
    state.sectores = payload;
  },
  SET_USER(state, payload) {
    state.user = payload;
  }
};

export const actions = {
  async logout({ commit }) {
    console.log("logging out");
    await auth.signOut();
    location.href = "/login";
  },
  async getToken() {
    try {
      let response = await auth.currentUser.getIdToken(true);
      return response;
    } catch (error) {
      console.log(error);
    }
  },
  incrementArticulo({ commit, state }, payload) {
    const index = state.articulos.findIndex(element => {
      return element.id == payload;
    });

    if (index === -1) return;

    commit("INCREMENT_ARTICULO", index);
  },
  decrementArticulo({ commit, state }, payload) {
    const index = state.articulos.findIndex(element => {
      return element.id == payload;
    });

    if (index === -1) return;

    commit("DECREMENT_ARTICULO", index);
  },
  removeArticulo({ commit }, payload) {
    commit("SET_ARTICULOS", payload);
  },
  saveArticulos({ commit }, payload) {
    commit("SET_ARTICULOS", payload);
  },
  saveLatitudes({ commit }, payload) {
    commit("SET_LATITUDES", payload);
  },
  saveMesas({ commit }, payload) {
    commit("SET_MESAS", payload);
  },
  saveData({ commit }, payload) {
    commit("SET_DATA", payload);
  },
  saveRubros({ commit }, payload) {
    commit("SET_RUBROS", payload);
  },
  saveSectores({ commit }, payload) {
    commit("SET_SECTORES", payload);
  },
  saveUser({ commit }, payload) {
    commit("SET_USER", payload);
  }
};
