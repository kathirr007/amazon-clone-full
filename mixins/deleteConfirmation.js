export default {
  data() {
    return {};
  },
  computed: {},
  methods: {
    confirmDeletion(id, index, title, e = null) {
      const isAuthenticated = this.$store.getters["isAuthenticated"];
      const authUser = this.$store.getters["authUser"];
      const isAdmin = authUser !== null ? authUser.admin : false;
      const h = this.$createElement;
      // debugger;
      if (!isAuthenticated) {
        const vNodesMsg = h("p", { class: ["text-center", "mb-0"] }, [
          h("b-spinner", { props: { type: "grow", small: true } }),
          " Hi ",
          h("strong", `Guest`),
          ` you need to be logged-In with Admin rights to do this Action `,
          h("strong", `${e.target.textContent} `),
          h("b-spinner", { props: { type: "grow", small: true } })
        ]);
        this.$root.$bvToast.toast([vNodesMsg], {
          title: `Authentication Error`,
          variant: "warning",
          solid: true
          // autoHideDelay: 15000,
        });
        this.$router.push("/login");
      } else if (!isAdmin) {
        const vNodesMsg = h("p", { class: ["text-center", "mb-0"] }, [
          h("b-spinner", { props: { type: "grow", small: true } }),
          " Hi ",
          h("strong", `${authUser.name}, `),
          ` you need to be Admin to do this Action `,
          h("strong", `${e.target.textContent} `),
          h("b-spinner", { props: { type: "grow", small: true } })
        ]);
        this.$bvToast.toast([vNodesMsg], {
          title: `Authorization Error`,
          variant: "danger",
          solid: true
          // autoHideDelay: 15000,
        });
      } else {
        // Using HTML string
        const titleVNode = h("div", {
          domProps: {
            innerHTML: "Please Confirm"
          }
        });
        // More complex structure
        const messageVNode = h(
          "p",
          {
            class: ["mb-0 text-center"]
          },
          [
            "Please confirm that you want to delete ",
            // h('br'),
            h("strong", `${title} `),
            // h('br'),
            "from the list"
          ]
        );
        // We must pass the generated VNodes as arrays
        this.$bvModal
          .msgBoxConfirm([messageVNode], {
            title: [titleVNode],
            titleClass: "text-white",
            centered: true,
            size: "md"
          })
          .then(value => {
            if (value == true) {
              // debugger
              this.onDeleteProduct(id, index, title);
            } else {
              return;
            }
          })
          .catch(err => {
            console.log(err);
          });
      }
    }
  }
};
