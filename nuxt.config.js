export default defineNuxtConfig({
  plugins: [
    { src: "~/plugins/filters" },
    { src: "~/plugins/localStorage", ssr: false },
    { src: "./plugins/vueCarousel.js", ssr: false },
    { src: "./plugins/vueStarRating", ssr: false }
  ],
  modules: [
    'nuxt3-vuex-module',
    // Doc: https://bootstrap-vue.js.org
    "bootstrap-vue/nuxt",
    // Doc: https://axios.nuxtjs.org/usage
    "@nuxtjs/axios",
    "@nuxtjs/pwa",
    // Doc: https://github.com/nuxt-community/dotenv-module
    "@nuxtjs/dotenv",
    // Doc: https://auth.nuxtjs.org/
    "@nuxtjs/auth"
    // Doc: https://github.com/nuxt-community/proxy-module
    // '@nuxtjs/proxy',
  ]
})
