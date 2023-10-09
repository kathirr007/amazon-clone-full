<template>
  <main>
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-6 offset-md-3">
          <h1 class="text-center mt-2">Add a New Category Form</h1>
          <!-- <b-form @submit="onSubmit" @reset="onReset" v-if="show"> -->
          <b-form>
            <!-- Category Type -->
            <b-form-group
              label="Type:"
              label-for="categoryType"
              description="Please enter Category type here"
            >
              <b-form-input
                id="categoryType"
                @keydown.enter.prevent="onAddCategory"
                v-model="categoryType"
                type="text"
                required
                placeholder="Enter category type"
              >
              </b-form-input>
            </b-form-group>

            <b-button
              type="button"
              @click.prevent="onAddCategory"
              variant="primary"
              >Add Category</b-button
            >
            <b-button ref="formReset" variant="danger">Reset</b-button>
          </b-form>
          <b-card class="my-3" header="Available Categories">
            <b-list-group class="categories-list">
              <b-list-group-item
                class="text-capitalize"
                v-for="(category, index) in categories"
                :key="category._id"
              >
                {{ category.type }}
                <span class="tags float-right">
                  <!-- <nuxt-link class="badge badge-primary" :to="`/admin/category/${category._id}`" variant="info">Update</nuxt-link> -->
                  <!-- <span class="tag is-info">Update</span> -->
                  <span
                    class="badge badge-danger"
                    @click="
                      confirmDeletion(
                        category._id,
                        index,
                        category.type,
                        $event
                      )
                    "
                    >Delete</span
                  >
                </span>
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
import deleteConfirmationMixin from "~/mixins/deleteConfirmation";
import { mapState } from "pinia";

definePageMeta({ layout: 'admin' })

export default {
  // layout: "admin",
  head: {
    title: "Add a new category",
  },
  async asyncData({ $axios }) {
    try {
      let res = await $axios.$get("/api/categories");
      // let owners = $axios.$get('/api/owners')

      return {
        categories: res.categories,
      };
    } catch (err) {
      console.log(err);
    }
  },
  mixins: [infoToastMixin, deleteConfirmationMixin],
  data() {
    return {
      categoryType: "",
    };
  },
  comoputed: {
    ...mapState(["authUser"]),
  },
  methods: {
    resetCategoryForm() {
      this.categoryType = "";
    },
    async onAddCategory() {
      let data = { type: this.categoryType };

      let result = await this.$axios.$post("/api/categories", data);
      console.log(
        `The new category ${this.categoryType} is added successfully...`
      );

      if (result.status) {
        data._id = result.catAdded._id;
        console.log(result.catAdded);
        this.categories.push(data);
      }
      this.makeToast("category", data.type, "add");
      this.resetCategoryForm();
      // this.$router.push('/')
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
            'The new category ',
            h('strong', `${this.categoryType}`),
            ' is added successfully... ',
            h('b-spinner', { props: { type: 'grow', small: true } })
          ],
        )
        this.$bvToast.toast(vNodesMsg, {
          title: 'Add Category Status',
          autoHideDelay: 5000,
          appendToast: append,
          variant: 'info'
        })
      }, */
    async onDeleteProduct(id, index, title) {
      try {
        // let productTitle = this.products[index].title
        // debugger
        let response = await this.$axios.$delete(`/api/categories/${id}`);
        // console.log(response.products)
        this.makeToast("category", title, "delete");
        if (response.status) {
          this.categories.splice(index, 1);
        }
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.categories-list .list-group-item {
  .badge {
    opacity: 0;
    transform: scale(1, 0);
    transform-origin: center bottom;
    // height: 0;
    cursor: pointer;
    transition: all 0.25s ease-in;
  }

  &:hover {
    .badge {
      opacity: 1;
      text-decoration: none;
      // height: auto;
      transform: scale(1, 1);
    }
  }
}
</style>
