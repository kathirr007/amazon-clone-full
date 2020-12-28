module.exports = {
  /*
   ** Nuxt rendering mode
   ** See https://nuxtjs.org/api/configuration-mode
   */
  server: {
    // port: 3100, // default 3000
    port: process.env.PORT || 4400
  },
  // mode: 'universal',
  telemetry: false,
  /*
   ** Nuxt target
   ** See https://nuxtjs.org/api/configuration-target
   */
  target: "server",
  /*
   ** Headers of the page
   ** See https://nuxtjs.org/api/configuration-head
   */
  head: {
    title: process.env.npm_package_name || "",
    script: [{ src: "https://js.stripe.com/v3" }],
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "description",
        name: "description",
        content: process.env.npm_package_description || ""
      }
    ],
    link: [
      { rel: "icon", type: "image/png", href: "/icon.png" },
      { rel: "stylesheet", href: "/css/font-awesome/css/all.css" },
      { rel: "stylesheet", href: "/css/default.css" }
    ]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: "#f0c14b" },
  /*
   ** Global CSS
   */
  css: ["@/assets/scss/main.scss"],
  /* Style resources */
  /*   styleResources: {
    // your settings here
    sass: [],
    scss: [
        '@assets/scss/variables.scss'
    ],
    less: [],
    stylus: []
  }, */
  /*
   ** Plugins to load before mounting the App
   ** https://nuxtjs.org/guide/plugins
   */
  plugins: [
    { src: "~/plugins/filters" },
    { src: "~/plugins/localStorage", ssr: false },
    { src: "./plugins/vue-carousel.min.js", ssr: false },
    { src: "./plugins/vueStarRating", ssr: false }
  ],
  /*
   ** Auto import components
   ** See https://nuxtjs.org/api/configuration-components
   */
  components: true,
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [],
  /*
   ** Nuxt.js modules
   */
  modules: [
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
  ],
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {
    baseURL: process.env.BASE_URL || `http://localhost:4400`
  },
  /* server Middleware */
  serverMiddleware: ["~/server/routes/index"],
  /* server Middleware end */
  /*
   ** Build configuration
   ** See https://nuxtjs.org/api/configuration-build/
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {},
    babel: { compact: true }
  },
  auth: {
    strategies: {
      local: {
        endpoints: {
          login: {
            propertName: "token"
          },
          logout: true
        }
      }
    }
  }
};
