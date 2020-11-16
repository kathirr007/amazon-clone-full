<template>
  <div>
    <Navbar />
    <nuxt />
    <Footer />
  </div>
</template>

<script>
  import Navbar from '~/components/Navbar'
  import Footer from '~/components/Footer'

  export default {
    components: {
      Navbar,
      Footer
    }
  }
</script>
<style lang="scss">
body {
  font-size: 14px;
  // line-height: 1.25;
  // color: #111;
}
</style>
