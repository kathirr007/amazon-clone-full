<template>
  <main>
    <div class="container-fluid">
      <div class="row">
        <!-- <div class="col-sm-3"></div> -->
        <div class="col-md-6 offset-md-3" >
          <h1 class="text-center mt-2">
            Update {{ product.title }}
          </h1>
          <!-- <b-form @submit="onSubmit" @reset="onReset" v-if="show"> -->
          <b-form ref="productForm">
            <!-- Category Selection dropdown -->
            <b-form-group label="Category:" label-for="productCategory">
              <b-form-select id="productCategory" class="text-capitalize" v-model="product.category" required>
                <option value="null">Select Category of the product</option>
                <option v-for="category in categories" class="text-capitalize" :key="category._id" :value="category._id">
                  {{ category.type }}
                </option>
              </b-form-select>
            </b-form-group>

            <!-- Owner Selection dropdown -->
            <b-form-group label="Owner:" class="text-capitalize" label-for="productOwner">
              <b-form-select id="productOwner" v-model="product.owner" required>
                <option value="null">Select Owner of the product</option>
                <option v-for="owner in owners" :key="owner._id" :value="owner._id">
                  {{ owner.name }}
                </option>
              </b-form-select>
            </b-form-group>

            <!-- Product title -->
            <b-form-group label="Title:" label-for="productTitle"
              description="Please enter Product title here">
              <b-form-input id="productTitle" v-model="product.title" type="text" required placeholder="Enter product title">
              </b-form-input>
            </b-form-group>

            <!-- Product Description -->
            <b-form-group label="Description: " label-for="productDescription">
              <b-form-textarea id="productDescription" v-model="product.description" placeholder="Enter product description..." rows="3" max-rows="6">
              </b-form-textarea>
            </b-form-group>

            <!-- Product images -->
            <b-form-group label="Photo:" label-for="productPhoto">
              <b-form-file @change="onFileSelected($event.target.files)" :file-name-formatter="formatNames" ref="imagesInput" multiple id="productPhoto" title=" "></b-form-file>
              <!-- <b-form-file @change="onFileSelected($event)" :file-name-formatter="formatNames" id="productPhoto"></b-form-file> -->
            </b-form-group>

            <!-- Uploaded images -->
            <b-row align-v="center">
                <div class="img-wrapp p-1" v-for="(prodImage, index) in selectedFiles" :key="index">
                    <!-- <img :src="prodImage.location" alt="" width="80px"> -->
                    <b-img thumbnail fluid :src="prodImage.location" :alt="prodImage.originalname" :ref="'image'+parseInt( index )"></b-img>
                    <i @click="deleteImage(prodImage,index)" class="delete-img fa fa-times"></i>
                </div>
            </b-row>

            <!-- Product Price -->
            <b-form-group label="Price:" label-for="productPrice"
              description="Please enter Product price here">
              <b-form-input id="productPrice" v-model="product.price" type="number" required placeholder="Enter product price">
              </b-form-input>
            </b-form-group>

            <!-- Product Stock Quantity -->
            <b-form-group label="Stock Quantity:" label-for="stockQuantity"
              description="Please enter Product stock quantity here">
              <b-form-input id="stockQuantity" v-model="product.stockQuantity" type="number" required placeholder="Enter product stock quantity">
              </b-form-input>
            </b-form-group>

            <b-button type="button" @click.prevent="onUpdateProduct" variant="primary">Update Product</b-button>
            <!-- <span class="a-button-register">
              <span class="a-button-inner">
                <span class="a-button-text">
                  Add Product
                </span>
              </span>
            </span> -->
            <b-button  ref="formReset" variant="danger">Reset</b-button>
          </b-form>
          <b-card class="mt-3" header="Form Data Result">
            <!-- <pre class="m-0">{{ product }}</pre> -->
            <!-- <pre class="m-0">{{ categories }}</pre>
            <pre class="m-0">{{ owners }}</pre> -->
            <pre class="m-0">category: {{ product.category }}</pre>
            <pre class="m-0">owner: {{ product.owner }}</pre>
            <pre class="m-0">title: {{ product.title }}</pre>
          </b-card>
        </div>
        <!-- <div class="col-sm-3"></div> -->
      </div>
    </div>
  </main>
</template>

<script>
  export default {
    head: {
      title: 'Add a new product'
    },
    async asyncData({ $axios, params }) {
      try {
        let categories = $axios.$get('http://localhost:4004/api/categories')
        let owners = $axios.$get('http://localhost:4004/api/owners')
        let product = $axios.$get(`http://localhost:4004/api/products/${params.id}`)

        const [catResponse, ownerResponse, productResponse] = await Promise.all([
          categories, owners, product
        ])

        console.log(productResponse)

        return {
          categories: catResponse.categories,
          owners: ownerResponse.owners,
          product: productResponse.product,
        }
      }
      catch(err) {
        console.log(err)
      }
    },
    data() {
      return {
        selectedFile: null,
        selectedFiles: [],
        uploadedFiles: [],
        mergedFiles: []
      }
    },
    watch:{
      mergedFiles() {
        this.$refs.imagesInput.setFiles(this.mergedFiles)
      }
    },
    comoputed:{

    },
    mounted() {
      this.uploadedFiles = this.product.prodImages
      this.mergedFiles.push(...this.uploadedFiles)
    },
    methods: {
      onFileSelected(fileList) {
        // debugger
        this.selectedFiles = fileList
        let uploadedFiles = fileList;
        for( var i = 0; i < uploadedFiles.length; i++ ){
          this.mergedFiles.push( uploadedFiles[i] );
        }

        // this.getImagePreviews();
      },
      getImagePreviews() {
        debugger
        this.mergedFiles.forEach((item, i=this.uploadedFiles.length) => {
          if ( /\.(jpe?g|png|gif|webp)$/i.test( this.mergedFiles[i].name ) ) {
            let reader = new FileReader();
            reader.addEventListener("load", function(){
              debugger
              this.$refs['image'+parseInt( i )][0].src = reader.result;
            }.bind(this), false);
            reader.readAsDataURL( this.mergedFiles[i] );
          }
        })
      },
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
      async onUpdateProduct() {
        let data = new FormData()
        // let $that = this
        /* this.mergedFiles.forEach((item, i) => {
          debugger
          data.append('prodImages', this.mergedFiles[i])
        }) */
        for(let i=0; i<this.selectedFiles.length; i++) {
          debugger
          data.append('prodImages', this.selectedFiles[i])
        }
        debugger
        data.append('title', this.product.title)
        data.append('price', this.product.price)
        data.append('description', this.product.description)
        data.append('stockQuantity', this.product.stockQuantity)
        data.append('ownerID', this.product.owner)
        data.append('categoryID', this.product.category)
        // data.append('photo', this.selectedFile, this.selectedFile.name)
        // data.append('prodImages', this.selectedFiles)
        // debugger

        let result = await this.$axios.$put(`http://localhost:4004/api/products/${this.$route.params.id}`, data)
        console.log(`The product ${this.product.title} is updated successfully...`)
        // this.$refs.imagesInput.reset()
        // this.$refs.productForm.reset()
        // this.selectedFiles = []
        // this.formatNames()
        this.makeToast()
        this.$router.push('/')
      },
      makeToast(append = false) {
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
      },
      deleteImage(img, index) {
        this.uploadedFiles.splice(index, 1);
        this.mergedFiles.splice(index, 1);
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
  .delete-img {
    position: absolute;
    right: 10px;
    top: 10px;
    cursor: pointer;
    transition: color .2s ease-in;
    &:hover {
      color: orangered;
    }
  }
}
</style>
