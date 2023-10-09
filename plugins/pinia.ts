import { defineNuxtPlugin } from 'nuxt/app'
import { useMainStore } from '~/store'

export default defineNuxtPlugin(({ $pinia }) => {
  return {
    provide: {
      store: useMainStore($pinia)
    }
  }
})
