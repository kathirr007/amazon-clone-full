<template>
  <main>
    <div class="container-fluid">
      <div class="row">
        <!-- <div class="col-sm-3"></div> -->
        <div class="col-md-6 offset-md-3" >
          <h1 class="text-center mt-2">
            Add a New Product Form
          </h1>
          <!-- <b-form @submit="onSubmit" @reset="onReset" v-if="show"> -->
          <b-form ref="productForm">
            <!-- Category Selection dropdown -->
            <b-form-group label="Category:" label-for="productCategory">
              <b-form-select id="productCategory" class="text-capitalize" v-model="categoryID" required>
                <option value="null">Select Category of the product</option>
                <option v-for="category in categories" class="text-capitalize" :key="category._id" :value="category._id">
                  {{ category.type }}
                </option>
              </b-form-select>
            </b-form-group>

            <!-- Owner Selection dropdown -->
            <b-form-group label="Owner:" class="text-capitalize" label-for="productOwner">
              <b-form-select id="productOwner" v-model="ownerID" required>
                <option value="null">Select Owner of the product</option>
                <option v-for="owner in owners" :key="owner._id" :value="owner._id">
                  {{ owner.name }}
                </option>
              </b-form-select>
            </b-form-group>

            <!-- Product title -->
            <b-form-group label="Title:" label-for="productTitle"
              description="Please enter Product title here">
              <b-form-input id="productTitle" v-model="title" type="text" required placeholder="Enter product title">
              </b-form-input>
            </b-form-group>

            <!-- Product Description -->
            <b-form-group label="Description: " label-for="productDescription">
              <b-form-textarea id="productDescription" v-model="description" placeholder="Enter product description..." rows="3" max-rows="6">
              </b-form-textarea>
            </b-form-group>

            <!-- Product images -->
            <b-form-group label="Photo:" label-for="productPhoto">
              <!-- <b-form-file @change="onFileSelected($event.target.files)" :file-name-formatter="formatNames" ref="imagesInput" multiple id="productPhoto"></b-form-file> -->
              <b-form-file @change="imagesAdd" :file-name-formatter="formatNames" ref="imagesInput" multiple id="productPhoto" title=" "></b-form-file>
            </b-form-group>

            <b-row align-v="center" class="uploaded-files">
                <div class="img-wrapp p-2" v-for="(prodImage, index) in image" :key="index">
                    <b-img thumbnail fluid :src="prodImage"></b-img>
                    <!-- <i @click="deleteImage(prodImage,index)" class="delete-img fa fa-times"></i> -->
                    <i @click="removeImage(index)" class="delete-img fas fa-times-circle"></i>
                </div>
            </b-row>

            <!-- Product Price -->
            <b-form-group label="Price:" label-for="productPrice"
              description="Please enter Product price here">
              <b-form-input id="productPrice" v-model="price" type="number" required placeholder="Enter product price">
              </b-form-input>
            </b-form-group>

            <!-- Product Stock Quantity -->
            <b-form-group label="Stock Quantity:" label-for="stockQuantity"
              description="Please enter Product stock quantity here">
              <b-form-input id="stockQuantity" v-model="stockQuantity" type="number" required placeholder="Enter product stock quantity">
              </b-form-input>
            </b-form-group>

            <b-button type="button" @click.prevent="onAddProduct" variant="primary">Add Product</b-button>
            <!-- <span class="a-button-register">
              <span class="a-button-inner">
                <span class="a-button-text">
                  Add Product
                </span>
              </span>
            </span> -->
            <b-button  ref="formReset" variant="danger">Reset</b-button>
          </b-form>
          <b-card class="my-3" header="Form Data Result">
            <!-- <pre class="m-0">{{ product }}</pre> -->
            <!-- <pre class="m-0">{{ categories }}</pre>
            <pre class="m-0">{{ owners }}</pre> -->
            <pre class="m-0">category: {{ categoryID }}</pre>
            <pre class="m-0">owner: {{ ownerID }}</pre>
            <pre class="m-0">title: {{ title }}</pre>
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
    transition(to, from) {
      if (!from) {
        return 'slide-left'
      }
      return 'slide-right'
    },
    head() {
      return {
        title: 'Add a new product'
      }
    },
    async asyncData({ $axios }) {
      try {
        let categories = $axios.$get('/api/categories')
        let owners = $axios.$get('/api/owners')

        const [catResponse, ownerResponse] = await Promise.all([
          categories, owners
        ])

        // console.log(catResponse.categories, ownerResponse.owners)

        return {
          categories: catResponse.categories,
          owners: ownerResponse.owners,
        }
      }
      catch(err) {
        console.log(err)
      }
    },
    mixins: [infoToastMixin, imgUploadMixin],
    data() {
      return {
        categoryID: null,
        ownerID: null,
        title: '',
        description: '',
        price: null,
        stockQuantity: null,
        selectedFile: null,
        selectedFiles: [],
        images: {},
        image: [],
      }
    },
    comoputed:{

    },
    methods: {
      formatNames(files=[]) {
        // this.selectedFile = files[0]
        if(files.length == 0) {
          return "No file chosen"
        }
        if (files.length === 1) {
          return files[0].name
        } else {
          return `${files.length} files selected`
        }
      },
      resetProductForm() {
        this.ownerID = null
        this.categoryID = null
        this.title = ''
        this.description = ''
        this.price = null
        this.stockQuantity = null
        this.selectedFile = null
        this.selectedFiles = []
      },
      async onAddProduct() {
        let data = new FormData()
        for(let i=0; i<this.images.length; i++) {
          data.append('prodImages', this.images[i])
        }
        data.append('title', this.title)
        data.append('price', this.price)
        data.append('description', this.description)
        data.append('stockQuantity', this.stockQuantity)
        data.append('ownerID', this.ownerID)
        data.append('categoryID', this.categoryID)
        // data.append('photo', this.selectedFile, this.selectedFile.name)
        // data.append('prodImages', this.selectedFiles)
        // debugger

        let result = await this.$axios.$post('/api/products', data)
        console.log(`The new product ${this.title} is added successfully...`)
        this.$refs.imagesInput.reset()
        this.image = []
        // this.$refs.productForm.reset()
        // this.selectedFiles = []
        // this.formatNames()
        this.makeToast(this.title, 'add')
        this.resetProductForm()
        // this.$router.push('/')
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
