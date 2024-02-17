<template>
  <!--MAIN-->
  <main>
    <!--REGISTER ADDRESS-->
    <div class="registerAddress mt-3">
      <div class="container-fluid c-section">
        <div class="row">
          <div class="col-sm-3"></div>
          <div class="col-sm-6">
            <div class="a-section a-spacing-medium">
              <div class="a-subheader a-breadcrumb a-spacing-small">
                <ul>
                  <li>
                    <span>Your Account</span>
                  </li>
                  <li class="a-breadcrumb-divider">&#10095;</li>
                  <li>
                    <nuxt-link to="/address">
                      <span>Your Adresses</span>
                    </nuxt-link>
                  </li>
                  <li class="a-breadcrumb-divider">&#10095;</li>
                  <li class="active">
                    <a href="#">
                      <span>New Address</span>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div class="a-section">
              <h2>Add a new address</h2>
              <div class="a-section a-spacing-none a-spacing-top-small">
                <b>
                  Or pick up your packages at your convenience from our self-service locations. To add an Amazon Pickup Point or Locker, click
                  <a
                    href="#"
                  >here</a>.
                </b>
              </div>
              <!-- Error Message -->
              <div class="a-section a-spacing-none a-spacing-top-small">
                <b></b>
              </div>
              <b-form>
                <div class="a-spacing-medium a-spacing-top-medium">
                  <!-- Country / Region -->
                  <div class="a-spacing-top-medium">
                    <label class="mb-2" for="selectCountry">Country/Region</label>
                    <b-form-select v-model="country" id="selectCountry" labelField="Country/Region">
                      <b-form-select-option
                        v-for="country in countries"
                        :key="country.alpha2Code"
                        :value="country.name">
                        {{ country.name }}
                      </b-form-select-option>
                    </b-form-select>
                  </div>
                  <!-- Full name -->
                  <div class="a-spacing-top-medium">
                    <b-form-group label="Full Name" label-for="fullName" description="">
                      <b-form-input id="fullName" v-model="fullName" type="text">
                      </b-form-input>
                    </b-form-group>
                  </div>
                  <!-- Street Address -->
                  <div class="a-spacing-top-medium">
                    <b-form-group label="Street Address" label-for="streetAddress" description="">
                      <b-form-input class="mb-2" id="streetAddress" v-model="streetAddress1" type="text">
                      </b-form-input>
                      <!-- Street Address 2 -->
                      <b-form-input v-model="streetAddress2" type="text">
                      </b-form-input>
                    </b-form-group>


                  </div>
                  <!-- City -->
                  <div class="a-spacing-top-medium">
                    <b-form-group label="City" label-for="city" description="">
                      <b-form-input id="city" v-model="city" type="text">
                      </b-form-input>
                    </b-form-group>
                  </div>
                  <!-- State -->
                  <div class="a-spacing-top-medium">
                    <b-form-group label="State / Province / Region" label-for="state" description="">
                      <b-form-input id="state" v-model="state" type="text">
                      </b-form-input>
                    </b-form-group>
                  </div>
                  <!-- Zip Code -->
                  <div class="a-spacing-top-medium">
                    <b-form-group label="Zip Code" label-for="zipCode" description="">
                      <b-form-input id="zipCode" v-model="zipCode" type="text">
                      </b-form-input>
                    </b-form-group>
                  </div>
                  <!-- Phone Number -->
                  <div class="a-spacing-top-medium">
                    <b-form-group label="Phone Number" label-for="phoneNumber" description="">
                      <b-form-input id="phoneNumber" v-model="phoneNumber" type="text">
                      </b-form-input>
                    </b-form-group>
                    <div class="a-section a-spacing-none a-spacing-top-micro">
                      <span class="a-size-mini">May be used to assist delivery</span>
                    </div>
                  </div>
                  <div class="a-spacing-base a-spacing-top-medium">
                    <h3>Add delivery instructions</h3>
                  </div>
                  <!-- Delivery Instruction -->
                  <div class="a-spacing-top-medium">
                    <b-form-group label="Do we need additional instructions to find this address?" label-for="deliveryInstructions">
                      <b-form-textarea id="deliveryInstructions" v-model="deliveryInstructions"
                        placeholder="Provide details such as building description, a nearby landmark, or other navigation instructions" rows="3" max-rows="6">
                      </b-form-textarea>
                    </b-form-group>
                  </div>
                  <!-- Security code -->
                  <div class="a-spacing-top-medium">
                    <b-form-group label="Do we need a security code or a call box number to access this building?" label-for="securityCode" description="">
                      <b-form-input id="securityCode" v-model="securityCode" placeholder="12345" type="text">
                      </b-form-input>
                    </b-form-group>
                  </div>
                  <div class="a-spacing-top-medium">
                    <label style="margin-bottom: 0px;">Weekend delivery</label>
                    <a href="#">
                      <i class="fas fa-angle-down"></i> Which days can you receive packages?
                    </a>
                  </div>
                  <div class="a-spacing-top-medium"></div>
                  <hr />
                  <div class="a-spacing-top-medium">
                    <span>
                      <b>Make sure your address is correct</b>
                    </span>
                  </div>
                  <div>
                    <span>If the address contains typos or other errors, your package may be undeliverable.</span>
                  </div>
                  <div class="a-spacing-top-small">
                    <span>
                      <a href="#">Tips for entering addresses</a>
                    </span>
                    <span>|</span>
                    <span>
                      <a href="#">APO/FPO address tips</a>
                    </span>
                  </div>
                  <div class="a-spacing-top-large">
                    <span class="a-button-register">
                      <span class="a-button-inner">
                        <span class="a-button-text" @click="onAddAddress">Add address</span>
                      </span>
                    </span>
                  </div>
                </div>
              </b-form>
            </div>
          </div>
          <div class="col-sm-3"></div>
        </div>
      </div>
    </div>
    <!--/REGISTER ADDRESS-->
  </main>
  <!--/MAIN-->
</template>

<script>
import infoToastMixin from '~/mixins/infoToast'

export default {
  transition(to, from) {
    if (!from) {
      return 'slide-left'
    }
    return 'slide-right'
  },
  head() {
    return {
      title: 'Add New Address'
    }
  },
  async asyncData({ $axios }) {
    try {
      let response = await $axios.$get('/api/countries')

      return {
        countries: response
      }
    } catch(err) {
      console.log(err)
    }
  },
  mixins: [infoToastMixin],
  data() {
    return {
      country: 'India',
      fullName: '',
      streetAddress1: '',
      streetAddress2: '',
      city: '',
      state: '',
      zipCode: '',
      phoneNumber: '',
      deliveryInstructions: '',
      securityCode: '',
    }
  },
  methods: {
    async onAddAddress({ $axios }) {
      try {
        let data = {
          country: this.country,
          fullName: this.fullName,
          streetAddress: `${this.streetAddress1} ${this.streetAddress2}`,
          city: this.city,
          state: this.state,
          zipCode: this.zipCode,
          phoneNumber: this.phoneNumber,
          deliveryInstructions: this.deliveryInstructions,
          securityCode: this.securityCode,
        }
        // debugger
        let response = await this.$axios.$post('/api/addresses', data)
        // debugger
        if(response.success) {
          this.makeToast('address', this.fullName, 'add')
          this.$router.push('/address')
        }

      } catch(err) {
        console.log(err)
      }

    }
  }
}
</script>
