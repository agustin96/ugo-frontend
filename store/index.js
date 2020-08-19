import { auth } from "@/plugins/firebase";

export const state = () => ({
  articulo: {},
  articulos: {},
  articulosFiltered: null,
  carrito: [],
  data: null,
  incrementModalDisplay: false,
  enabledCart: false,
  latitudes: null,
  mesas: null,
  rubros: null,
  sectores: null,
  user: ""
});

export const getters = {
  getCarritoAmount(state) {
    if (!state.carrito) return 0;

    let total = 0;

    state.carrito.forEach((e) => {
      total += e.price;
      if (e.specs && e.specs_datos.length > 0) {
        e.specs_datos.forEach((j) => {
          if (Array.isArray(j)) {
            if (j.length > 0) {
              j.forEach((k, i) => {
                total += k.precio;
              });
            }
          } else if (j.precio) {
            total += j.precio;
          }
        });
      }
    });

    return total;
  },
  getCarritoQuantity(state) {
    return state.carrito.reduce((total, num) => {
      return total + num.cantidad;
    }, 0);
  }
}

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
  SET_INCREMENT_MODAL_DISPLAY(state, payload) {
    state.incrementModalDisplay = payload;
  },
  SET_DECREMENT_MODAL_DISPLAY(state, payload) {
    state.decrementModalDisplay = payload;
  },
  SET_ENABLED_CART(state, payload) {
    state.enabledCart = payload;
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
  incrementArticulo({ commit, state, dispatch }, payload) {
    const indexArticulos = state.articulos.findIndex(element => {
      return element.id == payload.id;
    });

    if (indexArticulos === -1) return;

    // Busca en el CARRITO si existe el articulo
    const indexCarrito = state.carrito.findIndex(element => {
      return (element.id == payload.id && JSON.stringify(element.specs_datos) == JSON.stringify(payload.specs_datos));
    });

    const articulo = payload;

    commit("INCREMENT_ARTICULO", {indexArticulos, indexCarrito, articulo});

    dispatch('isCartEnabled');
  },
  decrementArticulo({ commit, state, dispatch }, payload) {
    const indexArticulos = state.articulos.findIndex(element => {
      return element.id == payload.id;
    });

    if (indexArticulos === -1) return;

    commit("DECREMENT_ARTICULO", indexArticulos);

    dispatch('isCartEnabled');
  },
  isCartEnabled({commit, state}) {
    let enabledCart = false;
    if (state.carrito.length > 0)
      enabledCart = true;

    commit("SET_ENABLED_CART", enabledCart);
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
