// import Vue from "vue";
import StarRating from "vue-star-rating";

// Vue.component("StarRating", StarRating);


export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(StarRating)
})
