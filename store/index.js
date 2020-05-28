import { auth } from "@/plugins/firebase";

export const state = () => ({
  articulo: {},
  articulos: {},
  articulosFiltered: null,
  carrito: [],
  dialog: false, // temporal para modal
  latitudes: null,
  mesas: null,
  rubros: null,
  sectores: null,
  user: ""
});

export const mutations = {
  INCREMENT_ARTICULO(state, payload) {
    state.articulos[payload.indexArticulos].cantidad++;

    if (payload.indexCarrito === -1) {
      state.carrito.push(payload.articulo);
    }
    else {
      state.carrito[payload.indexCarrito].cantidad++;
    }
  },
  DECREMENT_ARTICULO(state, payload) {
    if (state.articulos[payload].cantidad > 0)
      state.articulos[payload].cantidad--;
  },
  SET_ARTICULO(state, payload) {
    state.articulo = payload;
  },
  SET_ARTICULOS(state, payload) {
    state.articulos = payload;
  },
  SET_ARTICULOS_FILTERED(state, payload) {
    state.articulosFiltered = payload;
  },
  SET_LATITUDES(state, payload) {
    state.latitudes = payload;
  },
  SET_DATA(state, payload) {
    state.data = payload;
  },
  SET_DIALOG(state, payload) {
    state.dialog = payload;
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
    const indexArticulos = state.articulos.findIndex(element => {
      return element.id == payload.id;
    });

    if (indexArticulos === -1) return;

    // Busca en el CARRITO si existe el articulo
    const indexCarrito = state.carrito.findIndex(element => {
      return element.id == payload.id;
    });

    const articulo = payload

    commit("INCREMENT_ARTICULO", {indexArticulos, indexCarrito, articulo});
  },
  decrementArticulo({ commit, state }, payload) {
    const indexArticulos = state.articulos.findIndex(element => {
      return element.id == payload.id;
    });

    if (indexArticulos === -1) return;

    commit("DECREMENT_ARTICULO", indexArticulos);
  },
  removeArticulo({ commit }, payload) {
    commit("SET_ARTICULOS", payload);
  },
  saveArticulos({ commit }, payload) {
    commit("SET_ARTICULOS", payload);
  },
  saveArticulosFiltered({ commit }, payload) {
    commit("SET_ARTICULOS_FILTERED", payload);
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
