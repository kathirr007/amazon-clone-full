export default {
  data() {
    return {

    }
  },
  computed: {

  },
  methods: {
    capitalize(string) {
      return string.replace(/\w\S*/g, (w) => (w.replace(/^\w/, (c) => c.toUpperCase())))
    },
    makeToast(type, title, status) {
      let statusUpdate = ((status) => {
        if (status == 'update') {
          return 'updated'
        } else if (status == 'delete') {
          return 'deleted'
        } else if (status == 'add') {
          return 'added'
        } else if (status == 'setdefault') {
          return 'setted as default'
        }
      })
      // Use a shorter name for this.$createElement
      const h = this.$createElement
      // Create the message
      const vNodesMsg = h(
        'p',
        { class: ['text-center', 'mb-2'] },
        [
          h('b-spinner', { props: { type: 'grow', small: true } }),
          `The ${this.capitalize(type)} `,
          h('strong', `${title}`),
           ` ${statusUpdate(status)} successfully... `,
          h('b-spinner', { props: { type: 'grow', small: true } })
        ],
      )
      this.$root.$bvToast.toast(vNodesMsg, {
        title: `${this.capitalize(type)} update Status`,
        autoHideDelay: 5000,
        appendToast: false,
        variant: 'info'
      })
    }
  }
}
