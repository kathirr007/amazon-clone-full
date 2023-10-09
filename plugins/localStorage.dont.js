import createPersistedState from 'vuex-persistedstate'

/* export default ({store}) => {
  window.onNuxtReady(() => {
    createPersistedState({})(store)
  })
} */

export default defineNuxtPlugin(nuxtApp => {
  // now available on `nuxtApp.$injected`
  nuxtApp.provide('injected', () => 'my injected function')

  // You can alternatively use this format, which comes with automatic type support
  onNuxtReady(async () => {
    createPersistedState({})(store)
  })
})
