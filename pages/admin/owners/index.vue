<template>
  <main>
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-6 offset-md-3">
          <h1 class="text-center mt-2">Add a New Owner Form</h1>
          <!-- <b-form @submit="onSubmit" @reset="onReset" v-if="show"> -->
          <b-form>
            <!-- Owner name -->
            <b-form-group
              label="Name:"
              label-for="ownerName"
              description="Please enter owner name here"
            >
              <b-form-input
                id="ownerName"
                v-model="name"
                type="text"
                required
                placeholder="Enter owner name"
              >
              </b-form-input>
            </b-form-group>

            <!-- About Owner -->
            <b-form-group label="About: " label-for="aboutOwner">
              <b-form-textarea
                id="aboutOwner"
                v-model="about"
                placeholder="Enter details about owner"
                rows="3"
                max-rows="6"
              >
              </b-form-textarea>
            </b-form-group>

            <!-- Owner photo -->
            <b-form-group label="Photo:" label-for="ownerPhoto">
              <b-form-file
                @change="imagesAdd($event)"
                :file-name-formatter="formatNames"
                ref="imagesInput"
                id="ownerPhoto"
              ></b-form-file>
              <!-- <b-form-file @change="onFileSelected($event)" :file-name-formatter="formatNames" id="productPhoto"></b-form-file> -->
            </b-form-group>
            <b-row align-v="center" class="uploaded-files">
              <div
                class="img-wrapp p-2"
                v-for="(ownerImage, index) in image"
                :key="index"
              >
                <b-img thumbnail fluid :src="ownerImage"></b-img>
                <!-- <i @click="removeImage(index)" class="delete-img fas fa-times-circle"></i> -->
              </div>
            </b-row>

            <b-button
              type="button"
              @click.prevent="onAddOwner"
              variant="primary"
              >Add Owner</b-button
            >
            <b-button ref="formReset" variant="danger">Reset</b-button>
          </b-form>
          <b-card class="mt-3" header="Available Onwers">
            <b-list-group>
              <b-list-group-item
                class="text-capitalize"
                v-for="(owner, index) in owners"
                :key="owner._id"
              >
                {{ owner.name }}
                <b-badge
                  href="#"
                  class="float-right"
                  @click.prevent="
                    confirmDeletion(owner._id, index, owner.name, $event)
                  "
                  variant="danger"
                  >Delete</b-badge
                >
                <nuxt-link
                  class="badge badge-info float-right mr-2"
                  :to="`/admin/owners/${owner._id}`"
                  variant="info"
                  >Update</nuxt-link
                >
              </b-list-group-item>
            </b-list-group>
          </b-card>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import infoToastMixin from "~/mixins/infoToast";
import imgUploadMixin from "~/mixins/imgUpload";
import deleteConfirmationMixin from "~/mixins/deleteConfirmation";
// import { mapGetters } from "vuex";
export default {
  layout: "admin",
  transition(to, from) {
    if (!from) {
      return "slide-left";
    }
    return "slide-right";
  },
  head: {
    title: "Add a new owner",
  },
  mixins: [infoToastMixin, imgUploadMixin, deleteConfirmationMixin],
  async asyncData({ $axios }) {
    try {
      let res = await $axios.$get("/api/owners");
      // let owners = $axios.$get('/api/owners')

      return {
        owners: res.owners,
      };
    } catch (err) {
      console.log(err);
    }
  },
  data() {
    return {
      name: "",
      about: "",
      selectedFile: "",
    };
  },
  /* computed: {
    ...mapGetters(["authUser"]),
  }, */
  methods: {
    onFileSelected(fileList) {
      // debugger
      this.selectedFile = event.target.files[0];
    },
    formatNames(files = []) {
      // this.selectedFile = files[0]
      if (files.length == 0) {
        return "No file chosen";
      }
      if (files.length === 1) {
        return files[0].name;
      } else {
        return `${files.length} files selected`;
      }
    },
    resetOwnerForm() {
      this.name = "";
      this.about = "";
      this.selectedFile = null;
    },
    async onAddOwner() {
      let data = new FormData();
      // if(this.name == '' || this.about == '')
      data.append("name", this.name);
      data.append("about", this.about);
      data.append("photo", this.images[0]);

      let result = await this.$axios.$post("/api/owners", data);
      console.log(`The new owner ${this.name} is added successfully...`);

      var dataObject = {};
      data.forEach((value, key) => {
        dataObject[key] = value;
      });
      // dataObject = JSON.stringify(dataObject);

      if (result.status) {
        this.owners.push(dataObject);
        this.$refs.imagesInput.reset();
        this.makeToast("owner", `${this.name}`, "add");
        this.resetOwnerForm();
      }
      // this.$router.push('/')
    },
    async onDeleteProduct(id, index, title) {
      try {
        // let productTitle = this.products[index].title
        debugger;
        let response = await this.$axios.$delete(`/api/owners/${id}`);
        // console.log(response.products)
        debugger;
        this.makeToast("owner", title, "delete");
        if (response.status) {
          this.owners.splice(index, 1);
        }
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.img-wrapp {
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
    color: unset !important;
    transition: color 0.2s ease-in;
    &:hover {
      color: orangered !important;
    }
  }
}
.list-group-item {
  .badge {
    opacity: 0;
    transform: scale(1, 0);
    transform-origin: center bottom;
    // height: 0;
    transition: all 0.25s ease-in;
  }
  &:hover {
    .badge {
      opacity: 1;
      // height: auto;
      transform: scale(1, 1);
    }
  }
}
</style>
