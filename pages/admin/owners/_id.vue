<template>
  <main>
    <div class="container-fluid">
      <div class="row">
        <!-- <div class="col-sm-3"></div> -->
        <div class="col-md-6 offset-md-3" >
          <h1 class="text-center mt-2">
            Update {{ owner.name }}
          </h1>
          <nuxt-link to="/admin/owners" type="button" class="btn mb-3 btn-outline-danger">
            Go Back
          </nuxt-link>
          <!-- <b-form @submit="onSubmit" @reset="onReset" v-if="show"> -->
          <b-form ref="productForm">
            <!-- Owner name -->
            <b-form-group label="Name:" label-for="ownerName"
              description="Please enter owner name here">
              <b-form-input id="ownerName" v-model="owner.name" type="text" required placeholder="Enter owner name">
              </b-form-input>
            </b-form-group>

            <!-- About Owner -->
            <b-form-group label="About: " label-for="aboutOwner">
              <b-form-textarea id="aboutOwner" v-model="owner.about" placeholder="Enter details about owner" rows="3" max-rows="6">
              </b-form-textarea>
            </b-form-group>

            <!-- Owner image -->
            <b-form-group label="Photo:" label-for="ownerPhoto">
              <b-form-file @change="imagesAdd" :file-name-formatter="formatNames" ref="imagesInput" id="ownerPhoto" title=" "></b-form-file>
              <b-alert class="my-2" show variant="warning">Note: Uploading new image will replace the existing image</b-alert>
            </b-form-group>

            <!-- Uploaded images -->
            <!-- <b-row v-if="uploadedFiles.length !==0" align-v="center" class="uploaded-files">
                <div class="img-wrapp p-2" v-for="(prodImage, index) in uploadedFiles" :key="index">
                    <b-img thumbnail fluid :src="prodImage.location"></b-img>
                </div>
            </b-row> -->
            <b-row v-if="image.length != 0" align-v="center" class="uploaded-files">
                <div class="img-wrapp p-2" v-for="(ownerImage, index) in image" :key="index">
                    <b-img thumbnail fluid :src="ownerImage"></b-img>
                    <!-- <i @click="removeImage(index)" class="delete-img fas fa-times-circle"></i> -->
                </div>
            </b-row>
            <b-row v-else-if="owner.photo != ''" align-v="center" class="uploaded-files">
                <div class="img-wrapp p-2">
                    <b-img thumbnail fluid :src="owner.photo"></b-img>
                </div>
            </b-row>

            <b-button type="button" @click.prevent="onUpdateOwner" variant="primary">Update Owner</b-button>
            <b-button  ref="formReset" variant="danger">Reset</b-button>
          </b-form>
          <b-card class="mt-3" header="Form Data Result">
            <!-- <pre class="m-0">{{ product }}</pre> -->
            <!-- <pre class="m-0">{{ categories }}</pre>
            <pre class="m-0">{{ owners }}</pre> -->
            <pre class="m-0">name: {{ owner.name }}</pre>
            <pre class="m-0">about: {{ owner.about }}</pre>
            <pre class="m-0">photo: {{ owner.photo }}</pre>
          </b-card>
        </div>
        <!-- <div class="col-sm-3"></div> -->
      </div>
    </div>
  </main>
</template>

<script>
  import infoToastMixin from '~/mixins/infoToast'
  import imgUploadMixin from '~/mixins/imgUpload'
  export default {
    layout: 'admin',
    transition(to, from) {
      if (!from) {
        return 'slide-left'
      }
      return 'slide-right'
    },
    async asyncData({ $axios, params }) {
      try {
        // let categories = $axios.$get('/api/categories')
        // let owners = $axios.$get('/api/owners')
        let owner = $axios.$get(`/api/owners/${params.id}`)

        const [ownerResponse] = await Promise.all([
          owner
        ])

        console.log(ownerResponse.owner)

        return {
          owner: ownerResponse.owner,
        }
      }
      catch(err) {
        console.log(err)
      }
    },
    head: {
      title: 'Update Product'
    },
    data() {
      return {
        selectedFile: null,
        selectedFiles: [],
        uploadedFiles: [],
      }
    },
    mixins: [infoToastMixin, imgUploadMixin],
    watch:{
      /* mergedFiles() {
        this.$refs.imagesInput.setFiles(this.mergedFiles)
      } */
    },
    comoputed:{

    },
    mounted() {
      this.uploadedFiles = this.owner.photo
      // this.mergedFiles.push(...this.uploadedFiles)
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
      async onUpdateOwner() {
        let data = new FormData()
        // let $that = this
        /* this.mergedFiles.forEach((item, i) => {
          debugger
          data.append('prodImages', this.mergedFiles[i])
        }) */
        /* for(let i=0; i<this.images.length; i++) {
          // debugger
          data.append('prodImages', this.images[i])
        } */
        // debugger
        data.append('name', this.owner.name)
        data.append('about', this.owner.about)
        data.append('photo', this.images[0])
        // data.append('prodImages', this.selectedFiles)
        // debugger

        let result = await this.$axios.$put(`/api/owners/${this.$route.params.id}`, data)
        console.log(`The product ${this.owner.name} is updated successfully...`)
        // this.$refs.imagesInput.reset()
        // this.$refs.productForm.reset()
        // this.selectedFiles = []
        // this.formatNames()
        this.$router.push('/owners')
        this.makeToast('owner', this.owner.name, 'update')
      },
      /* makeToast(append = false) {
        // Use a shorter name for this.$createElement
        const h = this.$createElement
        // Increment the toast count
        // Create the message
        const vNodesMsg = h(
          'p',
          { class: ['text-center', 'mb-2'] },
          [
            h('b-spinner', { props: { type: 'grow', small: true } }),
            'The product ',
            h('strong', `${this.product.title}`),
            ' is updated successfully... ',
            h('b-spinner', { props: { type: 'grow', small: true } })
          ],
        )
        this.$bvToast.toast(vNodesMsg, {
          title: 'Product update Status',
          autoHideDelay: 5000,
          appendToast: append,
          variant: 'info'
        })
      }, */
      deleteImage(img, index) {
        // debugger
        this.uploadedFiles.splice(index, 1);
        [...this.selectedFiles].splice(index, 1);
        // this.mergedFiles.splice(index, 1);
        // $('.custom-file-label').html("")
      },
    }
  };

</script>

<style lang="scss" scoped>
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
