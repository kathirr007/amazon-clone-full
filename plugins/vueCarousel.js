// import Vue from "vue";
import { Carousel, Navigation, Pagination, Slide } from 'vue3-carousel'

// Vue.component("StarRating", StarRating);


export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(Carousel)
  nuxtApp.vueApp.use(Navigation)
  nuxtApp.vueApp.use(Pagination)
  nuxtApp.vueApp.use(Slide)
})
