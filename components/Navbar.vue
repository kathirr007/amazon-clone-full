<template>
  <div>
    <header class="nav-opt-sprite nav-locate-us nav-lang-en nav-ssl nav-unrec">
      <div class="container-fluid desktop-nav">
        <div class="row">
          <!-- Search bar -->
          <div class="col-sm-2">
            <div class="logo-area">
              <nuxt-link to="/">
                <b-img src="/img/logo.png" alt="Logo" fluid></b-img>
              </nuxt-link>
            </div>
          </div>

          <!-- Search bar -->
          <div class="col-sm-6 pt-0">
            <Search />
          </div>
          <div class="col-sm-4"></div>
        </div>
        <div class="row">
          <!-- Delivery -->
          <b-col cols="2" sm="2" class="pl-2">
            <div class="nav-global-location">
              <nuxt-link to="/address" class="nav-a nav-a-2">
                <div class="nav-sprite" id="nav-packard-glow-loc-icon"></div>
                <div id="glow-ingress-block">
                  <span class="nav-line-1" id="glow-ingress-line1">Deliver to</span>
                  <span
                    v-if="$auth.$state.user !== null && $auth.$state.user?.address !== undefined"
                    class="nav-line-2"
                    id="glow-ingress-line2"
                  >{{$auth.$state.user?.address.city}}</span>
                  <span v-else class="nav-line-2" id="glow-ingress-line2">India</span>
                </div>
              </nuxt-link>
            </div>
          </b-col>
          <!-- Shopping -->
          <b-col cols="6" sm="6" md="4" lg="5" xl="6" class="p-0">
            <div class="nav-fill">
              <div class="nav-shop">
                <nuxt-link to="/history" class="nav-a nav-a-2 nav-single-row-link">
                  <span class="nav-line-2">
                    Browsing history
                    <span class="nav-icon nav-arrow" style="visibility: visible"></span>
                  </span>
                </nuxt-link>
              </div>
              <div class="nav-xshop-container">
                <div class="nav-xshop">
                  <a href="#" class="nav-a">Today's deals</a>
                  <a href="#" class="nav-a">Your amazon.com</a>
                  <a href="#" class="nav-a">Gift cards</a>
                  <a href="#" class="nav-a">Registry</a>
                  <a href="#" class="nav-a">Sell</a>
                </div>
              </div>
            </div>
          </b-col>
          <!-- Accounts and order and cart -->
          <b-col cols="4" sm="4" md="6" lg="5" xl="4" class="p-0">
            <div class="nav-tools">
              <a href="#" id="icp-nav-flyout" class="nav-a nav-a-2 icp-link-style-2">
                <span class="icp-nav-link-inner">
                  <span class="nav-line-1">
                    <span class="icp-nav-globe-img-2"></span>
                    <span class="icp-nav-language">EN</span>
                  </span>
                  <span class="nav-line-2">
                    &nbsp;
                    <span class="nav-icon nav-arrow" style="visibility:visible"></span>
                  </span>
                </span>
              </a>
              <span class="icp-nav-link-border"></span>
              <template v-if="isAuthenticated">
                <nuxt-link
                  to="/profile"
                  class="nav-a nav-a-2"
                  id="nav-link-accountList"
                  tabindex="0"
                >
                  <span class="nav-line-1">Hello,</span>
                  <span class="nav-line-2">{{ authUser.name }}</span>
                </nuxt-link>
              </template>

              <template v-else>
                <nuxt-link
                  to="/signup"
                  class="nav-a nav-a-2"
                  id="nav-link-accountList"
                  tabindex="0"
                >
                  <span class="nav-line-1">Hello, Sign in</span>
                  <span class="nav-line-2">
                    Account &amp; Lists
                    <span class="nav-icon nav-arrow" style="visibility:visible"></span>
                  </span>
                </nuxt-link>
              </template>
              <nuxt-link to="/orders" class="nav-a nav-a-2 nav-single-row-link">
                  <span class="nav-line-1"></span>
                  <span class="nav-line-2">Orders</span>
                </nuxt-link>
              <nuxt-link to="/cart" class="nav-a nav-a-2" id="nav-cart">
                <span class="nav-line-1" aria-hidden="true"></span>
                <span class="nav-line-2" aria-hidden="true">Cart</span>
                <span class="nav-cart-icon nav-sprite"></span>
                <span
                  id="nav-cart-count"
                  aria-hidden="true"
                  class="nav-cart-count nav-cart-0"
                >{{getCartLength}}</span>
              </nuxt-link>
            </div>
          </b-col>
        </div>
      </div>
    </header>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Search from "~/components/Search";

export default {
  components: {
    Search,
  },
  data: () => {
    return {
      // loggedIn: false
    }
  },
  computed: {
    ...mapGetters(["getCartLength", "isAuthenticated", "authUser"]),
  }
};
</script>

<style lang="scss" scoped>
</style>
