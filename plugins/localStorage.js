// https://www.npmjs.com/package/vuex-persistedstate

// Actualmente deshabilitado en @/nuxt.config.js

import createPersistedState from 'vuex-persistedstate'
 
export default ({store}) => {
  window.onNuxtReady(() => {
    createPersistedState({
        //key: 'data',  // name of the key (default: vuex)
        paths: ["articulos", "carrito", "data"],   // states to persist
    })(store)
  })
}