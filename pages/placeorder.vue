<template>
  <!--SHIPPING ADDRESS-->
  <div class="container-fluid">
    <div class="shipping-address">
      <div class="navbarShipping a-spacing-large">
        <nuxt-link to="/">
          <img src="img/placeHeadernav.gif" class="img-fluid" />
        </nuxt-link>
      </div>
      <div class="a-row">
        <div class="a-size-large a-text-bold a-spacing-mini">
          Review your order
        </div>
        <div class="a-row a-spacing-small a-size-mini"></div>
      </div>
      <div class="row">
        <div class="col-xl-9 col-lg-8 col-md-9 col-sm-12">
          <div class="a-row a-spacing-large"></div>
          <div class="spc-top a-box a-spacing-small">
            <div class="a-box-inner">
              <div class="row">
                <div class="col-xl-4 col-lg-6 col-sm-6 col-6">
                  <div class="a-spacing-base">
                    <div class="a-row">
                      <strong>
                        Shipping address
                        <small>
                          <nuxt-link to="/address">Change</nuxt-link>
                        </small>
                      </strong>
                    </div>
                    <div class="a-row">
                      <div class="displayAddressDiv">
                        <ul
                          v-if="
                            authUser !== undefined &&
                            authUser.address !== undefined
                          "
                          class="displayAddressUL"
                        >
                          <li>{{ authUser.address.fullName }}</li>
                          <li>{{ authUser.address.streetAddress }}</li>
                          <li>{{ authUser.address.city }}</li>
                          <li>
                            {{ authUser.address.country }}
                          </li>
                          <li>
                            Phone:
                            <span dir="ltr">{{
                              authUser.address.phoneNumber
                            }}</span>
                          </li>
                        </ul>
                        <div
                          v-else-if="
                            addresses !== undefined && addresses.length !== 0
                          "
                        >
                          <ul class="displayAddressUL">
                            <li>{{ addresses[0].fullName }}</li>
                            <li>{{ addresses[0].streetAddress }}</li>
                            <li>{{ addresses[0].city }}</li>
                            <li>
                              {{ addresses[0].country }}
                            </li>
                            <li>
                              Phone:
                              <span dir="ltr">{{
                                addresses[0].phoneNumber
                              }}</span>
                            </li>
                          </ul>
                        </div>
                        <div v-else>
                          You are not added any Address. Please add
                          <nuxt-link to="/address">here</nuxt-link>.
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-xl-4 col-lg-6 col-sm-6 col-6">
                  <div class="a-spacing-base">
                    <div class="a-row">
                      <strong>
                        Payment Method
                        <small>
                          <a href="#">Change</a>
                        </small>
                      </strong>
                    </div>
                    <div class="a-row">
                      <ul class="no-bullet-list">
                        <li class="a-spacing-micro">
                          <span class="a-list-item">
                            <span>
                              <img src="img/visa.gif" class="img-fluid" />
                            </span>
                            ending in
                            <span>6397</span>
                          </span>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div class="a-row a-spacing-base">
                    <div class="a-row">
                      <strong>
                        Billing Address
                        <small>
                          <a href="#">Change</a>
                        </small>
                      </strong>
                    </div>
                    <span>Same as shipping address</span>
                  </div>
                </div>
                <div class="col-xl-4 col-lg-6 col-sm-12 col-12">
                  <div class="a-spacing-base">
                    <div class="a-spacing-mini">
                      <span>
                        <strong>Gift cards &amp; promotional codes</strong>
                      </span>
                    </div>
                    <div class="row">
                      <div
                        class="col-xl-8 col-lg-7 col-md-7 col-sm-7 col-8 pr-0"
                      >
                        <input
                          type="text"
                          autocomplete="off"
                          class="a-input-text"
                          placeholder="Enter Code"
                        />
                      </div>
                      <div class="col-xl-4 col-lg-5 col-md-5 col-sm-5 col-4">
                        <span class="a-buton-apply-code">
                          <span class="a-button-inner">
                            <span class="a-button-text">Apply</span>
                          </span>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="spc-orders a-box">
            <div class="a-box-inner">
              <div class="shipping-group">
                <div
                  class="a-row a-color-state a-text-bold a-size-medium a-spacing-small"
                >
                  Estimated delivery: {{ estimatedDelivery }}
                </div>
                <div class="row">
                  <div class="col-xl-6 col-lg-7 col-sm-6 col-12">
                    <div
                      class="a-row a-spacing-base"
                      v-for="product in getCart"
                      :key="product._id"
                    >
                      <div class="row">
                        <div class="col-sm-3 col-3">
                          <img :src="product.photo" style="width: 100px" />
                        </div>
                        <div class="col-sm-9 col-9">
                          <div class="a-row">
                            <nuxt-link :to="`products/${product._id}`">
                              <strong>{{ product.title }}</strong>
                            </nuxt-link>
                          </div>
                          <div class="a-row a-size-small">
                            by {{ product.owner.name }}
                          </div>
                          <div class="a-row">
                            <span class="a-color-price a-spacing-micro">
                              <strong dir="ltr"
                                >${{ product.price * product.quantity }}</strong
                              >
                            </span>
                          </div>
                          <div class="a-row">
                            <span class="availability a-color-success"
                              >In Stock.</span
                            >
                          </div>
                          <div class="a-row">
                            <strong>Quantity: {{ product.quantity }}</strong>
                          </div>
                          <div class="a-row a-color-secondary a-size-small">
                            Sold by: Amazon.com Services, Inc
                          </div>
                          <div class="a-row">
                            <div class="a-row a-spacing-top-micro">
                              <span class="a-button-small">
                                <span class="a-button-inner">
                                  <i class="a-icon checkout-giftbox-icon"></i>
                                  <a
                                    href="#"
                                    class="a-button-text gift-popover-link"
                                    >Add a gift receipt</a
                                  >
                                </span>
                              </span>
                            </div>
                            <div class="a-row">
                              <span class="a-color-secondary a-size-mini"
                                >and see other gift options</span
                              >
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="col-xl-6 col-lg-5 col-sm-6 col-12">
                    <div class="a-row shipping-speeds">
                      <fieldset>
                        <span class="shipping-speeds-title a-size-medium">
                          <b>Choose a delivery option:</b>
                        </span>
                        <div class="a-spacing-mini wednesday">
                          <input
                            type="radio"
                            name="order0"
                            checked
                            @change="onChooseShipping('normal')"
                          />
                          <span class="a-radio-label">
                            <span class="a-color-success">
                              <strong>Averages 7 business days</strong>
                            </span>
                            <br />
                            <span class="a-color-secondary"
                              >$13.98 - Standard International Shipping - No
                              Tracking</span
                            >
                          </span>
                        </div>
                        <br />
                        <div class="a-spacing-mini tuesday">
                          <input
                            type="radio"
                            name="order0"
                            @change="onChooseShipping('fast')"
                          />
                          <span class="a-radio-label">
                            <span class="a-color-success">
                              <strong>Averages 3 business days</strong>
                            </span>
                            <br />
                            <span class="a-color-secondary"
                              >$49.98 - Shipping</span
                            >
                          </span>
                        </div>
                      </fieldset>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-xl-3 col-lg-4 col-md-3 col-sm-12 pl-0">
          <div class="a-box-group">
            <div class="a-box a-first">
              <div class="a-box-inner">
                <div class="a-row a-spacing-micro">
                  <nuxt-link to="/payment">
                    <span class="a-button-place-order"
                      >Place your order in USD</span
                    >
                  </nuxt-link>
                </div>
                <div class="a-row a-spacing-small a-size-small a-text-center">
                  By placing your order, you agree to Amazon's
                  <a href="#">privacy notice</a>
                  and
                  <a href="#">conditions of use</a>.
                </div>
                <div class="a-row">
                  <div id="tfx-header">
                    <div class="a-box a-alert-info a-spacing-small">
                      <div class="a-box-inner alert-info-no-icon">
                        <strong>
                          Amazon Currency Converter is Enabled.
                          <a href="#" class="a-size-mini">Learn More</a>
                        </strong>
                      </div>
                    </div>
                  </div>
                  <h3 class="a-spacing-micro a-size-base">Order Summary</h3>
                  <div class="order-summary" style="font-size: 12px">
                    <div class="row">
                      <div class="col-sm-6">Items:</div>
                      <div class="col-sm-6 text-right">
                        USD ${{ getCartTotalPrice }}
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-sm-6">Shipping &amp; handling:</div>
                      <div class="col-sm-6 text-right">
                        USD {{ shippingPrice }}
                      </div>
                    </div>
                    <div class="row mt-2">
                      <div class="col-sm-6"></div>
                      <div class="col-sm-6 text-right">
                        <hr />
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-sm-6">Total Before Tax:</div>
                      <div class="col-sm-6 text-right">
                        USD {{ getCartTotalPriceWithShipping }}
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-sm-6">Estimated tax to be collected:</div>
                      <div class="col-sm-6 text-right">USD 0.00</div>
                    </div>
                    <hr />
                    <div class="row">
                      <div class="col-sm-6">
                        <div class="a-color-price a-size-medium a-text-bold">
                          Order total:
                        </div>
                      </div>
                      <div class="col-sm-6 text-right">
                        <div class="a-color-price a-size-medium a-text-bold">
                          USD {{ getCartTotalPriceWithShipping }}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="a-box a-last a-color-alternate-background">
              <div class="a-box-inner">
                <div class="a-spacing-base">
                  <div class="a-row">
                    <span>
                      <i class="fas fa-caret-down"></i>
                      <a href="#">Selected payment currency</a>
                    </span>
                    <fieldset class="pl-3">
                      <span style="margin-left: 1rem">
                        <input
                          type="radio"
                          class="no-js-hide"
                          value="transactional"
                        />
                        <span class="a-radio-label">USD</span>
                      </span>
                      <div class="a-row">
                        <span class="a-size-mini">
                          <a href="#">(Change card currency)</a>
                        </span>
                      </div>
                    </fieldset>
                  </div>
                </div>
                <div class="a-size-mini">
                  <div class="a-row a-spacing-mini mb-1">
                    Please note that your country may charge import duties,
                    taxes and fees that you may have to pay ahead of delivery.
                    <a href="#">Learn more</a>
                  </div>
                  <div class="a-row a-spacing-mini mb-1">
                    <a href="#">How are shipping costs calculated?</a>
                  </div>
                  <div class="a-row a-spacing-mini">
                    <a href="#">Why didn't I qualify for free shipping?</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="a-row a-spacing-small a-spacing-top-small">
        <p class="a-color-secondary a-size-mini">
          Do you need help? Explore our
          <a href="#">Help pages</a> or
          <a href="#">contact us</a>
        </p>
        <p class="a-color-secondary a-size-mini">
          For an item sold by Amazon.com: When you click the "Place your order"
          button, we'll send you an email message acknowledging receipt of your
          order. Your contract to purchase an item will not be complete until we
          send you an email notifying you that the item has been shipped.
        </p>
        <p id="state-sales-tax-info" class="a-color-secondary a-size-mini">
          Colorado, Oklahoma, South Dakota and Vermont Purchasers:
          <a href="#"
            >Important information regarding sales tax you may owe in your
            State</a
          >
        </p>
        <div class="a-color-secondary a-size-mini">
          <p class="a-color-secondary a-size-mini">
            Within 30 days of delivery, you may return new, unopened merchandise
            in its original condition. Exceptions and restrictions apply. See
            Amazon.com's
            <a href="#">Returns Policy</a>
            <br />
            <br />Go to the <a href="#">Amazon.com homepage</a> without
            completing your order.
          </p>
        </div>
      </div>
      <hr />
      <p class="a-size-small a-text-center a-color-secondary" data-testid>
        <a href="#">Conditions of Use</a> | <a href="#">Privacy Notice</a> ©
        1996-2019, Amazon.com, Inc.
      </p>
    </div>
  </div>
  <!--/SHIPPING ADDRESS-->
</template>

<script>
import { mapGetters } from "vuex";

export default {
  transition(to, from) {
    if (!from) {
      return "slide-left";
    }
    return "slide-right";
  },
  head() {
    return {
      title: `Place Your Order`,
    };
  },
  middleware: "loggedIn",
  // auth: 'guest',
  // layout: "none",
  async asyncData({ $axios, store }) {
    try {
      let response = await $axios.$post("api/shipment", { shipment: "normal" });
      let addressesResponse = await $axios.$get("/api/addresses");
      // console.log(addressesResponse);

      store.commit("setShipping", {
        price: response.shipment.price,
        estimatedDelivery: response.shipment.estimated,
      });

      return {
        addresses: addressesResponse.addresses,
        shippingPrice: response.shipment.price,
        estimatedDelivery: response.shipment.estimated,
      };
    } catch (err) {
      console.log(err);
    }
  },
  data() {
    return {
      // addresses: [],
    };
  },
  computed: {
    ...mapGetters([
      "authUser",
      "getCart",
      "getCartTotalPrice",
      "getCartTotalPriceWithShipping",
    ]),
  },
  /* async mounted() {
    let response = await this.$axios.$get("/api/addresses");
    if (response.success && response.addresses.length !== 0) {
      this.addresses = response.addresses;
    }
  }, */
  methods: {
    async onChooseShipping(shipment) {
      try {
        let response = await this.$axios.$post("api/shipment", {
          shipment: shipment,
        });

        this.$store.commit("setShipping", {
          price: response.shipment.price,
          estimatedDelivery: response.shipment.estimated,
        });

        (this.shippingPrice = response.shipment.price),
          (this.estimatedDelivery = response.shipment.estimated);
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>
