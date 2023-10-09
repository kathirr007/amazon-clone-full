<template>
  <div class="container">
    <div id="root">
      <div>
        <label for="">Some other input</label>
        <input type="text" v-model="otherInput">
      </div>
      <div>
        <input type="file" ref="im" name="images[]" @change="imagesAdd" multiple>
      </div>
      <div class="img-wrap">
        <div class="img" v-for="(img, key) in image" :key="key">
          <img class="img-pre" :src="img">
          <button v-show="image" @click="removeImage(key)">Remover</button>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
  definePageMeta({ layout: 'admin' })
  export default {
    // layout: 'admin',
    data() {
      return {
        images: {},
        image: [],
        otherInput: '',
      }
    },
    methods: {
      imagesAdd(e) {
        var files = e.target.files || e.dataTransfer.files;

        this.images = [];
        Array.prototype.push.apply(this.images, files);
        if (!this.images.length)
          return;

        this.createImage(this.images);

      },

      createImage(file) {
        for (var i = 0; i < file.length; i++) {
          var reader = new FileReader();
          var vm = this;

          reader.onload = (e) => {
            vm.image.push(e.target.result);
            console.log(vm.image);
          };
          reader.readAsDataURL(file[i]);
        }
      },
      removeImage(key) {
        this.image.splice(key, 1);
        this.images.splice(key, 1);

        if (!this.image.length) {
          this.$refs.im.value = '';
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
.img-wrap {
  display: flex;
  .img {
    width: 25%;
    img {
      width: 100%;
      height: auto;
    }
  }
}
</style>
