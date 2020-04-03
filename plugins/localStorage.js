// https://www.npmjs.com/package/vuex-persistedstate

// Actualmente deshabilitado en @/nuxt.config.js

import createPersistedState from 'vuex-persistedstate'
 
export default ({store}) => {
  window.onNuxtReady(() => {
    createPersistedState({
        key: 'user',
    })(store)
  })
}