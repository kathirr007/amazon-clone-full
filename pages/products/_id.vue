<template>
  <main>
    <!-- Breadcrumbs -->
    <div class="container-fluid mt-2">
      <div class="wayfinding-breadcrumbs-container">
        <ul class="a-unordered-lista a-horizontal a-size-small">
          <li>
            <span class="a-list-item">
              <a href="#" class="a-link-normal a-color-tertiary">{{ product.category.type }}</a>
            </span>
          </li>
          <li>
            <span class="a-list-item">></span>
          </li>
          <li>
            <span class="a-list-item">
              <a href="#" class="a-link-normal a-color-tertiary">{{ product.title }}</a>
            </span>
          </li>
        </ul>
      </div>
    </div>
    <div class="container-fluid">
      <div class="dp-container">
        <div class="row">
          <!-- First 3 grid - Product Image and Author's section-->
          <b-col col sm="4" md="3" lg="3">
            <div class="leftCol">
              <!-- Image -->
              <div class="imgBlock">
                <div class="eBooksimg">
                  <b-img fluid :src="product.photo"></b-img>
                </div>
              </div>

              <!-- Follow Author -->
              <div class="authorFollow">
                <hr class="a-divider-normal" />
                <h1 class="authorFollowHeading">Follow The Author</h1>
                <div class="mt-2">
                  <div class="row">
                    <!-- Author's Image -->
                    <b-col cols="3" sm="3" md="3" lg="3" xl="3">
                      <div class="smallAuthorImageContainer">
                        <a href="#">
                          <b-img fluid :src="product.owner.photo"></b-img>
                        </a>
                      </div>
                    </b-col>
                    <!-- Author's Name -->
                    <b-col cols="3" sm="3" md="3" lg="3" xl="4">
                      <div class="authorNameCol">
                        <a href="#">{{ product.owner.name }}</a>
                      </div>
                    </b-col>
                    <!-- Author's Follow Button -->
                    <b-col cols="6" sm="6" md="6" lg="6" xl="5">
                      <div class="authorBtn mt-2">
                        <a href="#">
                          <span class="btnFollow">
                            <span class="a-btn-inner">
                              <button class="a-btn-text">+ Follow</button>
                            </span>
                          </span>
                        </a>
                      </div>
                    </b-col>
                  </div>
                </div>
              </div>
            </div>
          </b-col>
          <!-- Middle 6 grid Description -->
          <b-col col sm="8" md="6" lg="6">
            <div class="centerCol">
              <!-- Product Title -->
              <div class="titleDiv">
                <h1 class="productTitle">
                  <span class="largeTitle">{{ product.title }}</span>
                  <!-- <span class="smallTitle">Product title small</span> -->
                </h1>
              </div>
              <!-- Author's Name -->
              <div class="bylineinfo">
                by
                <a href="#" class="authorName">
                  {{ product.owner.name }}
                  <i
                    class="fas fa-chevron-down"
                    style="font-size: 8px !important; color #555 !important;"
                  ></i>
                </a> (Author)
              </div>
              <div class="reviewGroup border-bottom pb-2">
                <client-only>
                  <star-rating
                    :increment="0.5"
                    :rating="product.averageRating"
                    :show-rating="false"
                    :glow="1"
                    :border-width="1"
                    :rounded-corners="true"
                    :read-only="true"
                    :star-size="18"
                    :star-points="[23,2,14,17,0,19,10,34,7,50,23,43,38,50,36,34,46,19,31,17]"
                  ></star-rating>
                </client-only>
              </div>
              <!-- A tags Dummy data -->
              <div class="mediaMatrix mt-2">
                <div class="formats">
                  <a href="#" class="link-expander">
                    >
                    <span class="tmmShowPrompt">See all 18 formats and editions</span>
                  </a>
                  <ul>
                    <!-- Kindle -->
                    <li class="swatchElement" style="width: 117px;">
                      <span class="a-list-item">
                        <span class="a-button-toggle">
                          <span class="a-button-inner">
                            <a href="#" class="a-button-text">
                              <span>Kindle</span>
                              <br />
                              <span class="a-color-secondary">-</span>
                            </a>
                          </span>
                        </span>
                        <span class="tmm-olp-links"></span>
                        <span class="tmm-olp-links">
                          <a href="#" class="a-size-min">
                            <span class="kcpAppBox">
                              <span class="a-declarative">
                                Read with Our
                                <span class="a-text-bold">Free App</span>
                              </span>
                            </span>
                          </a>
                        </span>
                      </span>
                    </li>
                    <!-- Audible -->
                    <li class="swatchElement" style="width: 117px;">
                      <span class="a-list-item">
                        <span class="a-button-toggle">
                          <span class="a-button-inner">
                            <a href="#" class="a-button-text">
                              <span>
                                <b-img src="/img/audiblelogo.png" fluid style="width: 20px;"></b-img>Audible
                              </span>
                              <br />
                              <span class="a-color-secondary">-</span>
                            </a>
                          </span>
                        </span>
                        <span class="tmm-olp-links"></span>
                        <span class="tmm-olp-links">
                          <a href="#" class="a-size-min">
                            <span class="kcpAppBox">
                              <span class="a-declarative">
                                <span class="a-text-bold">Free App</span> with your Audible trial
                              </span>
                            </span>
                          </a>
                        </span>
                      </span>
                    </li>
                    <!-- Paperback -->
                    <li class="swatchElement" style="width: 117px;">
                      <span class="a-list-item">
                        <span class="a-button-toggle">
                          <span class="a-button-inner">
                            <a href="#" class="a-button-text">
                              <span>Paperback</span>
                              <br />
                              <span class="a-color-secondary">-</span>
                            </a>
                          </span>
                        </span>
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
              <!-- Description -->
              <div class="bookDescription">
                <div class="bookDescriptionInner">{{ product.description }}</div>
              </div>

              <!-- Product Specification -->
              <div class="aboutEbooksFeature">
                <hr />
                <div class="row">
                  <b-col col sm="4" mb-1>
                    <div class="a-declarative">
                      Length:
                      <span>
                        <a href="#">
                          386 pages
                          <i class="a-icon a-icon-popover"></i>
                        </a>
                      </span>
                    </div>
                  </b-col>
                </div>
              </div>
            </div>
          </b-col>
          <!-- Last 3 grid - Buying section -->
          <b-col col sm="6" md="3">
            <div class="combinedBuyBox">
              <div class="buyBox">
                <div class="a-section">
                  <div class="clearfix">
                    <div class="float-left">
                      <form>
                        <input type="radio" id="test1" name="radio-group checked" />
                        <label for="test1">Buy Now</label>
                      </form>
                    </div>

                    <!-- Product Price -->
                    <div class="float-right">
                      <span
                        class="a-size-medium a-color-price offer-price a-text-normal"
                      >${{ product.price }}</span>
                    </div>
                  </div>
                </div>

                <div class="a-section a-spacing-none">
                  <div class="row">
                    <b-col cols="5" sm="5">
                      <select name id>
                        <option value="1">Qty: 1</option>
                        <option value="2">Qty: 2</option>
                        <option value="3">Qty: 3</option>
                        <option value="4">Qty: 4</option>
                        <option value="5">Qty: 5</option>
                        <option value="6">Qty: 6</option>
                        <option value="7">Qty: 7</option>
                        <option value="8">Qty: 8</option>
                        <option value="9">Qty: 9</option>
                        <option value="10">Qty: 10</option>
                      </select>
                    </b-col>
                  </div>
                </div>

                <div class="a-section a-spacing-small a-spacing-top-micro">
                  <div class="row">
                    <span class="a-color-base buyboxShippingLabel"></span>
                  </div>
                </div>
                <div class="a-section a-spacing-small">
                  <div class="a-section a-spacing-none">
                    <span class="a-size-medium a-color-success">In Stock</span>
                  </div>
                  <div class="a-section a-spacing-mini">Ships from and sold by Amazon.com</div>
                </div>

                <div class="a-section">
                  <div class="a-button-stack" @click="addProductToCart(product)">
                    <span class="a-spacing-small a-button-primary a-button-icon">
                      <span class="a-button-inner">
                        <i class="a-icon a-icon-cart"></i>
                        <input type="submit" name="submit.add-to-card" class="a-button-input" />
                        <span class="a-button-text">Add to Cart</span>
                      </span>
                    </span>
                  </div>
                  <div class="a-button-stack">
                    <span class="a-spacing-small a-button-primary a-button-icon">
                      <span class="a-button-inner">
                        <i class="a-icon a-icon-buynow"></i>
                        <input type="submit" name="submit.add-to-card" class="a-button-input" />
                        <span class="a-button-text">Buy Now</span>
                      </span>
                    </span>
                  </div>
                </div>

                <div class="a-row">
                  <div class="a-spacing-top-small">
                    <div class="a-section a-spacing-none">
                      <div class="a-section a-spacing-none a-spacing-top-mini">
                        This item ships to
                        <b>India</b>
                        <b>Get it by Monday, Sep 23 - Monday, Sept. 30</b>
                        Choose this date at checkout
                      </div>
                    </div>
                  </div>
                </div>

                <hr />

                <span class="a-declarative">
                  <a href="#" class="a-link-normal">
                    <div class="a-row a-spacing-mini">
                      <i class="fal fa-map-marked-alt"></i>
                      <span class="a-size-small">Deliver to India</span>
                    </div>
                  </a>
                </span>
                <br />
                <hr />
                <div class="a-section">
                  <div class="clearfix">
                    <div class="float-left">
                      <form>
                        <input type="radio" id="test2" name="radio-group" />
                        <label for="test1">Buy Now</label>
                      </form>
                    </div>
                    <div class="flow-right">
                      <span class="a-color-base offer-price a-text-normal">${{ product.price }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="kcpAppBasebox text-center">
              <b-img src="/img/readyondevice.png" fluid></b-img>
            </div>
          </b-col>
        </div>

        <br />
        <hr />
        <div class="books-entity-tease">
          <div class="bucket">
            <h2>More about the author</h2>
            <div class="content">
              <div class="row">
                <!-- Author's photo and Button -->
                <b-col cols="4" sm="4" md="2">
                  <div class="authorContent">
                    <div class="authorImageSingle">
                      <a href="#">
                        <b-img fluid :src="product.owner.photo"></b-img>
                      </a>
                    </div>
                    <div class="authorFollow">
                      <button class="followButton" type="button">
                        <span class="pr-fb-icon"></span>
                        <span class="pr-fb-text">Follow</span>
                      </button>
                    </div>
                  </div>
                </b-col>
                <!-- Author's about -->
                <b-col cols="8" sm="8" md="10" class="pl-0">
                  <div class="mainContent">
                    <h3>Biography</h3>
                    <div id="authorBio">{{ product.owner.about }}</div>
                  </div>
                </b-col>
              </div>
            </div>
          </div>
        </div>

        <review-section :product="product" :reviews="reviews"></review-section>
      </div>
    </div>
  </main>
</template>

<script>
import { mapActions } from "vuex";
import ReviewSection from "~/components/ReviewSection";
// import StarRating from 'vue-star-rating'

export default {
  transition(to, from) {
    if (!from) {
      return "slide-left";
    }
    return "slide-right";
  },
  async asyncData({ $axios, params }) {
    try {
      let singleProduct = await $axios.$get(`/api/products/${params.id}`);
      let manyReviews = await $axios.$get(`/api/reviews/${params.id}`);
      // console.log(response)

      const [productResponse, reviewsResponse] = await Promise.all([
        singleProduct,
        manyReviews,
      ]);

      // console.log(typeof(productResponse.product.rating))
      // console.log(productResponse.product.rating)
      // console.log(typeof(reviewsResponse.reviews[0].rating))
      // console.log(reviewsResponse.reviews[0].rating)

      return {
        product: productResponse.product,
        reviews: reviewsResponse.reviews,
      };
    } catch (err) {
      console.log(err);
    }
  },
  head() {
    return {
      title: `${this.product.title.replace(/\w\S*/g, (w) =>
        w.replace(/^\w/, (c) => c.toUpperCase())
      )}`,
    };
  },
  components: {
    ReviewSection,
    // StarRating
  },
  methods: {
    ...mapActions(["addProductToCart"]),
  },
};
</script>

<style lang="scss" scoped>
</style>
