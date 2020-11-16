<template>
  <!--MAIN-->
  <main>
    <!--REVIEW ADDRESS-->
    <div class="reviewPage mt-3">
      <div class="container-fluid c-section">
        <div class="row">
          <div class="col-sm-2"></div>
          <div class="col-sm-8">
            <div class="a-spacing-top-medium mb-5">
              <h1 class="a-spacing-base">
                <b>Create Review</b>
              </h1>
              <div class="row">
                <!-- Product Photo -->
                <div class="col-md-2 col-sm-3 col-3">
                  <img :src="product.photo" style="width: 80px" />
                </div>
                <!-- Product Title -->
                <div class="col-md-10 col-sm-9 col-9 m-auto">
                  <h4>
                    <b>{{ product.title }}</b>
                  </h4>
                </div>
              </div>
              <div class="a-spacing-top-medium"></div>
              <hr />
              <!-- <h2 class="a-spacing-base">Overall Rating</h2> -->

              <div class="a-row a-spacing-top-medium">
                <b-form-group label="Overall Rating:" label-for="reviewRating" class="" description="">
                  <client-only>
                    <star-rating :increment="0.5" v-model="rating" :star-size="25" :rounded-corners="true" :padding="1"></star-rating>
                  </client-only>
                </b-form-group>
                <!-- Review image -->
                <b-form-group label="Add photo or video:" label-for="reviewPhoto" description="Shoppers find images and videos more helpful than text alone.">
                  <b-form-file @change="imagesAdd" :file-name-formatter="formatNames" ref="imagesInput" id="reviewPhoto" title=" "></b-form-file>
                </b-form-group>

                <b-row align-v="center" class="uploaded-files">
                    <div class="img-wrapp p-2" v-for="(ownerImage, index) in image" :key="index">
                        <b-img thumbnail fluid :src="ownerImage"></b-img>
                        <!-- <i @click="removeImage(index)" class="delete-img fas fa-times-circle"></i> -->
                    </div>
                </b-row>
                <!-- <b-row v-else-if="owner.photo != ''" align-v="center" class="uploaded-files">
                    <div class="img-wrapp p-2">
                        <b-img thumbnail fluid :src="owner.photo"></b-img>
                    </div>
                </b-row> -->
              </div>
              <div class="a-spacing-top-large"></div>
              <hr />
              <!-- Headline -->
              <div class="headline a-spacing-large">
                <b-form-group label="Add review headline:" label-for="reviewHeadline" description="">
                  <b-form-input id="reviewHeadline" v-model="headline" type="text" required placeholder="What's most important to know?">
                  </b-form-input>
                </b-form-group>
              </div>
              <div class="a-spacing-base">
                <!-- Review Description -->
                <b-form-group label="Write your review: " label-for="reviewDescription">
                  <b-form-textarea id="reviewDescription" v-model="body" placeholder="What do you like or dislike? What did you see this product for?" rows="3" max-rows="6">
                  </b-form-textarea>
                </b-form-group>
              </div>
            </div>
            <hr />
            <div class="a-spacing-top-medium">
              <p
                style="font-size: 14px; font-weight: 700;"
              >This is how you'll appear to other customers:</p>
              <div class="media">
                <div class="media-left">
                  <img src="/img/avatar.png" class="img-fluid" style="width: 50px;" />
                </div>
                <div class="media-body pl-3 pt-2">
                  <input type="text" class="a-input-text" :value="$auth.$state.user.name" style="width: 100%;" />
                </div>
              </div>
            </div>
            <div class="a-row mt-2">
              <span class="a-color-tertiary">Don't worry, you can always change this on your profile</span>
            </div>
            <div class="a-row text-right a-spacing-top-large">
              <span class="a-button-register">
                <span class="a-button-inner">
                  <span class="a-button-text" @click="onAddReview">Submit</span>
                </span>
              </span>
            </div>
          </div>
          <div class="col-sm-2"></div>
        </div>
        <div class="a-spacing-large pb-5"></div>
        <hr />
      </div>
    </div>
    <!--/REVIEW ADDRESS-->
  </main>
  <!--/MAIN-->
</template>

<script>
  import infoToastMixin from '~/mixins/infoToast'
  import imgUploadMixin from '~/mixins/imgUpload'
  import StarRating from 'vue-star-rating'

  export default {
    head() {
      return {
        title: `Review ${this.product.title}`
      }
    },
    async asyncData({$axios, params}) {
      // debugger
      try {
        let response = await $axios.$get(`/api/products/${params.id}`)
        // console.log(response.product)
        return {
          product: response.product
        }
      } catch(err) {
        console.log(err)
      }
    },
    mixins: [infoToastMixin, imgUploadMixin],
    components: {
      StarRating
    },
    data() {
      return{
        selectedFiles: [],
        rating: 0,
        headline: '',
        body: ''
      }
    },
    methods: {
      formatNames(files=this.selectedFiles) {
        // this.selectedFile = files[0]
        if(files.length == 0) {
          return "No file chosen"
        }
        if (files.length === 1) {
          return files[0].name ? files[0].name : files[0].originalname
        } else {
          return `${files.length} files selected`
        }
      },
      async onAddReview() {
        try {
          let data = new FormData()
          data.append('headline', this.headline)
          data.append('rating', this.rating)
          data.append('body', this.body)
          data.append('photo', this.images[0])

          let response = await this.$axios.$post(`/api/reviews/${this.$route.params.id}`, data)

          if(response.success) {
            this.$router.push(`/products/${this.$route.params.id}`)
          }

        } catch(err) {
          console.log(err)
        }
      },
    },
  }
</script>

<style scoped lang="scss">
.img-wrapp{
  position: relative;
  width: 25%;
  .img-thumbnail {
    padding: 1rem;
  }
  .delete-img.fas {
    position: absolute;
    right: 5px;
    top: 0px;
    cursor: pointer;
    font-size: 18px !important;
    color:unset !important;
    transition: color .2s ease-in;
    &:hover {
      color: orangered !important;
    }
  }
}
</style>
