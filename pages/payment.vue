<template>
<!-- Main -->
  <main>
    <!-- Payment -->
    <div class="registerAddress mt-3">
      <div class="container-fluid c-section">
        <div class="row">
          <div class="col-sm-6 offset-sm-3">
            <div class="a-section a-spacint-medium">
              <!-- Breadcrumbs -->
              <div class="a-subheader a-breadcrumb a-spacing-small">
                <ul class="a-unordered-lista a-horizontal a-size-small">
                  <li>
                    <nuxt-link to="/cart">
                      <span>Your Cart</span>
                    </nuxt-link>
                  </li>
                  <li>
                    <span class="a-breadcrumb-divider">></span>
                  </li>
                  <li>
                    <nuxt-link to="/placeorder">
                      <span>Place Order</span>
                    </nuxt-link>
                  </li>
                  <li>
                    <span class="a-breadcrumb-divider">></span>
                  </li>
                  <li class="active">
                    <nuxt-link to="/payment">
                      <span>Payment</span>
                    </nuxt-link>
                  </li>
                </ul>
              </div>
            </div>
            <div class="a-section">
              <h2>Make a paymnet</h2>
              <div class="a-section a-spacing-none a-spacing-top-small">
                <b>The total price is ${{getCartTotalPriceWithShipping}}</b>
              </div>

              <!-- Error Message -->
              <div class="a-section a-spacing-none a-spacing-top-small">
                <b>Error</b>
              </div>
              <form action="#" method="post"></form>
              <div class="a-spacing-medium a-spacing-top-medium">
                <div class="a-spacing-top-medium">
                  <!-- Stipe card -->
                    <div ref="card">

                    </div>
                  <!-- Stipe card end-->
                </div>
                <div class="a-spacing-top-medium"></div>
                <hr>
                <div class="a-spacing-top-medium">
                  <span>
                    <b>Make sure your address is correct</b>
                  </span>
                </div>
                <div>
                  <span>If the address contains typos or other errors, your package may be undeliverable.</span>
                </div>

                <!-- Purchase Button -->
                <div class="a-spacing-top-large">
                  <span class="a-button-register">
                    <span class="a-button-inner">
                      <span class="a-button-text" @click="onPurchase">
                        Purchase
                      </span>
                    </span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import {mapGetters} from 'vuex'
  export default {
    transition(to, from) {
      if (!from) {
        return 'slide-left'
      }
      return 'slide-right'
    },
    head() {
      return {
        title: `Make Payment`
      }
    },
    data() {
      return {
        error: '',
        stripe: null,
        card: null
      }
    },
    computed: {
      ...mapGetters(['getCart', 'getCartTotalPriceWithShipping', 'getEstimatedDelivery'])
    },
    mounted() {
      this.stripe = Stripe('pk_test_krAf3HsWv3GLs5EXlXXRpv1O00IWashr2l')
      let elements = this.stripe.elements()
      this.card = elements.create('card')
      this.card.mount(this.$refs.card)
    },
    methods: {
      async onPurchase() {
        try {
          let token = await this.stripe.createToken(this.card)

          let response = await this.$axios.$post('/api/payment', {
            token: token,
            totalPrice: this.getCartTotalPriceWithShipping,
            cart: this.getCart,
            estimatedDelivery: this.estimatedDelivery
          })

          if(response.success) {
            this.$store.commit('clearCart')
            this.$router.push('/')
          }
        } catch(err) {
          console.log(err)
        }
      }
    }
  }
</script>

<style lang="scss">
.StripeElement {
  box-sizing: border-box;
  height: 40px;
  padding: 10px 12px;
  border: 1px solid transparent;
  border-radius: 4px;
  box-shadow: 0 1px 3px 0 #e6ebf1;
  -webkit-transition: box-shadow 150ms ease;
  transition: box-shadow 150ms ease;
}
.StripeElement--focus {
  box-shadow: 0 1px 3px 0 #cfd7df;
}
.StripeElement--invalid {
  border-color: #fa755a;
}
.StripeElement--webkit-autofill {
  background-color: #fefde5 !important;
}
</style>
