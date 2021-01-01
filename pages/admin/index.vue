<template>
  <main>
    <div class="container-fluid browsing-history mb-3">
      <div class="row">
        <div class="col-sm-8 col-12 text-center text-sm-left">
          <h1 class="mb-3">All products</h1>
          <!-- Buttons -->
          <nuxt-link to="/" class="a-button-buy-again"
            >Back to Client Home</nuxt-link
          >
          <nuxt-link to="/admin/products" class="a-button-buy-again"
            >Add a new product</nuxt-link
          >
          <nuxt-link to="/admin/category" class="a-button-buy-again"
            >Add a new category</nuxt-link
          >
          <nuxt-link to="/admin/owners" class="a-button-buy-again"
            >Add a new owner</nuxt-link
          >
        </div>
      </div>
    </div>
    <div class="container-fluid browsing-history">
      <!-- <div class="row">
        <div v-for="(product) in products" :key="product._id" class="col-lg-3 col-sm-6 col-12">
          <b-card
            :title="product.title"
            :img-src="product.photo != ''? product.photo : ''"
            :img-alt="product.title"
            img-top
            tag="article"
            class="mb-2 history-box img-fluid p-2"
          >
            <b-card-text>
              {{product.description}}
            </b-card-text>
            <b-card-text>
              <a href=""></a>
              <i class="fas fa-star"></i>
              <i class="fas fa-star"></i>
              <i class="fas fa-star"></i>
              <i class="fas fa-star"></i>
              <i class="fas fa-star"></i>
              <span class="a-letter-space"></span>
              <span class="a-color-tertiary a-size-small asin-reviews">(1774)</span>
            </b-card-text>
            <b-card-text>
              Price: <span class="text-danger">{{product.price}}</span>
            </b-card-text>

            <div class="float-right">
              <b-button href="#" variant="primary">Update</b-button>
              <b-button href="#" variant="dark">Delete</b-button>
            </div>
          </b-card>
        </div>
      </div> -->
      <div class="row">
        <!-- <div>
          <client-only>
            <carousel v-bind="options">
              <slide v-for="i in 5" :key="i" class="img-wrapper">
                <img src="https://via.placeholder.com/150" />
              </slide>
            </carousel>
          </client-only>
        </div> -->
        <div>
          <b-card-group columns class="px-3">
            <!-- <b-card
              v-for="(product, index) in products" :key="product._id"
              :title="product.title"
              :img-src="product.photo"
              :img-alt="product.title"
              img-top
              tag="article"
              class="mb-2 history-box p-2"
            >
              <b-card-text>
                {{product.description}}
              </b-card-text>
              <b-card-text>
                <a href=""></a>
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <span class="a-letter-space"></span>
                <span class="a-color-tertiary a-size-small asin-reviews">(1774)</span>
              </b-card-text>
              <b-card-text>
                Price: <span class="text-danger">{{product.price}}</span>
              </b-card-text>

              <div class="float-right">
                <nuxt-link :to="`products/${product._id}`" variant="primary" class="btn btn-primary">Update</nuxt-link>
                <b-button href="#" variant="dark" @click.prevent="onDeleteProduct(product._id, index, product.title)">Delete</b-button>
              </div>
            </b-card> -->
            <b-card
              v-for="(product, index) in products"
              :key="product._id"
              tag="article"
              class="mb-2 history-box p-2"
            >
              <client-only
                v-if="product.prodImages && product.prodImages.length != 0"
              >
                <carousel v-bind="carouselOptions">
                  <slide v-for="(image, i) in product.prodImages" :key="i">
                    <b-img :src="image.location"></b-img>
                  </slide>
                </carousel>
              </client-only>
              <div v-else class="img-wrap text-center">
                <b-img :src="product.photo" fluid></b-img>
              </div>
              <h3 class="card-title">{{ product.title }}</h3>
              <b-card-text>
                {{ product.description }}
              </b-card-text>
              <b-card-text>
                <a href=""></a>
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <span class="a-letter-space"></span>
                <span class="a-color-tertiary a-size-small asin-reviews"
                  >(1774)</span
                >
              </b-card-text>
              <b-card-text>
                Price: <span class="text-danger">{{ product.price }}</span>
              </b-card-text>

              <div class="float-right">
                <b-button
                  @click.prevent="
                    isAdmin($event, `admin/products/${product._id}`)
                  "
                  variant="primary"
                  class="btn btn-primary"
                  >Update</b-button
                >
                <b-button
                  variant="dark"
                  @click.prevent="
                    confirmDeletion(product._id, index, product.title, $event)
                  "
                  >Delete</b-button
                >
              </div>
            </b-card>
          </b-card-group>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import infoToastMixin from "~/mixins/infoToast";
import deleteConfirmationMixin from "~/mixins/deleteConfirmation";
// import { Carousel, Slide } from 'vue-carousel';
import { mapGetters } from "vuex";

export default {
  layout: "admin",
  head: {
    title: "Home",
  },
  // middleware: "loggedIn",
  // asyncData is fetching data before nuxt page finished loading on the browser
  // It is good for SEO because the data will be loaded first
  async asyncData({ $axios }) {
    // debugger
    try {
      let response = await $axios.$get("/api/products");
      // console.log(response.products)
      return {
        products: response.products,
      };
    } catch (err) {}
  },
  mixins: [infoToastMixin, deleteConfirmationMixin],
  components: {
    Carousel: () =>
      process.browser ? import("vue-carousel").then((m) => m.Carousel) : null,
    Slide: () =>
      process.browser ? import("vue-carousel").then((m) => m.Slide) : null,
  },
  data() {
    return {
      slide: 0,
      carouselOptions: {
        loop: true,
        perPage: 1,
        // paginationEnabled: false,
        autoplay: false,
        paginationColor: "#ffb300",
        // autoplayHoverPause: true
      },
    };
  },
  computed: {
    ...mapGetters(["authUser"]),
  },
  methods: {
    async onDeleteProduct(id, index, title) {
      try {
        // let productTitle = this.products[index].title
        // debugger
        let response = await this.$axios.$delete(`/api/products/${id}`);
        // console.log(response.products)
        this.makeToast("product", title, "delete");
        if (response.status) {
          this.products.splice(index, 1);
        }
      } catch (err) {
        console.log(err);
      }
    },
    isAdmin(e, path) {
      console.log(e);
      const isAdmin = this.authUser.admin;
      const h = this.$createElement;
      const vNodesMsg = h("p", { class: ["text-center", "mb-0"] }, [
        h("b-spinner", { props: { type: "grow", small: true } }),
        " Hi ",
        h("strong", `${this.authUser.name}, `),
        ` you need to be Admin to do this Action `,
        h("strong", `${e.target.textContent} `),
        h("b-spinner", { props: { type: "grow", small: true } }),
      ]);
      if (!isAdmin) {
        this.$bvToast.toast([vNodesMsg], {
          title: `Authorization Error`,
          variant: "danger",
          solid: true,
          // autoHideDelay: 15000,
        });
      } else {
        this.$router.push(path);
      }
    },
  },
  transition(to, from) {
    if (!from) {
      return "slide-left";
    }
    return "slide-right";
  },
};
</script>

<style lang="scss" scoped>
.card-img-top,
.img-wrap .img-fluid,
.VueCarousel-slide img {
  width: 100%;
  height: 200px;
  object-fit: contain;
}
@media (min-width: 576px) {
  .card-columns {
    column-count: 2;
    column-gap: 1rem;
  }
}
@media (min-width: 992px) {
  .card-columns {
    column-count: 3;
  }
}
@media (min-width: 1400px) {
  .card-columns {
    column-count: 4;
  }
}
/*  .VueCarousel {
   .VueCarousel-wrapper {
     .VueCarousel-inner{
       .VueCarousel-slide {
         img {
           width: 100%;
           height: auto;
         }
       }
     }
   }
 } */
</style>
<style lang="scss">
.VueCarousel-dot-container {
  margin-top: 0 !important;
  .VueCarousel-dot {
    margin-top: 0 !important;
    &:focus,
    &:active {
      outline: none !important;
    }
    &.VueCarousel-dot--active {
      // margin-top: 0 !important;
      width: 15px !important;
      height: 15px !important;
      background-color: chocolate !important;
    }
  }
}
.b-toaster {
  &.b-toaster-top-right {
    .b-toaster-slot {
      min-width: 300px;
      max-width: 45%;
      .b-toast,
      .toast {
        max-width: unset;
      }
    }
  }
}
</style>
