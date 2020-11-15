export default {
  data() {
    return {

    }
  },
  computed: {

  },
  methods: {
    confirmDeletion(id, index, title) {
      // debugger
      const h = this.$createElement
      // Using HTML string
      const titleVNode = h('div', {
        domProps: {
          innerHTML: 'Please Confirm'
        }
      })
      // More complex structure
      const messageVNode = h('p', {
        class: ['mb-0 text-center']
      }, [
          'Please confirm that you want to delete ',
          // h('br'),
          h('strong', `${title} `),
          // h('br'),
          'from the list'
        ])
      // We must pass the generated VNodes as arrays
      this.$bvModal.msgBoxConfirm([messageVNode], {
        title: [titleVNode],
        titleClass : 'text-white',
        centered: true,
        size: 'md'
      })
      .then(value => {
          if (value == true) {
            debugger
            this.onDeleteProduct(id, index, title)
          } else {
            return
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
  }
}
