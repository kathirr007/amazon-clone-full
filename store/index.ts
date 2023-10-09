import { defineStore } from 'pinia'

export const useMainStore = defineStore('main', {
  state: () => ({
    // State
    cart: [] as any[],
    cartLength: 0,
    shippingPrice: 0,
    shippingEstimatedDelivery: "",
    authenticated: null,
    auth: null,
  }),
  getters: {
    getCartLength(): number {
      return this.cartLength;
    },
    getCart(): any[] {
      return this.cart;
    },
    getCartTotalPrice(): number {
      let total = 0;
      this.cart.map((product:any) => {
        total += product.price * product.quantity;
      });

      return total;
    },
    getCartTotalPriceWithShipping(): number {
      let total = 0;
      this.cart.map((product:any) => {
        total += product.price * product.quantity;
      });

      return total + this.shippingPrice;
    },
    getEstimatedDelivery(): string {
      return this.shippingEstimatedDelivery;
    },
    authUser() : Record<string, any> | null {
      return (this.auth as any)?.user || null;
    },
    isAuthenticated() : boolean | null {
      return (this.auth as any).loggedIn || null;
    }
  },
  actions: {
    pushProductToCart(product) {
      product.quantity = 1;
      this.cart.push(product);
    },
    incrementProductQty(product) {
      product.quantity++;
      let indexOfProduct = this.cart.indexOf(product);
      this.cart.splice(indexOfProduct, 1, product);
    },
    incrementCartLength() {
      this.cartLength = 0;
      if (this.cart.length > 0) {
        this.cart.map(product => (this.cartLength += product.quantity));
      }
    },
    /*
      1. Find the product in the cart
      2. Change the quantity of the product
      3. Update the length of the cart
      4. Replace the old product with the updated product
    */

    changeQty({ product, qty }) {
      // debugger
      let cartProduct = this.cart.find(prod => prod._id === product._id);
      cartProduct.quantity = qty;

      this.cartLength = 0;
      if (this.cart.length > 0) {
        this.cart.map(product => (this.cartLength += product.quantity));
      }

      let indexOfProduct = this.cart.indexOf(cartProduct);
      this.cart.splice(indexOfProduct, 1, cartProduct);
    },
    /*
      1. Remove the product quantity from the cartLength
      2. Get the index of the product that we want to delete
      3. Remove that product by using the splice
    */
    removeProduct(product) {
      this.cartLength -= product.quantity;
      let indexOfProduct = this.cart.indexOf(product);
      this.cart.splice(indexOfProduct, 1);
    },
    setShipping({ price, estimatedDelivery }) {
      this.shippingPrice = price;
      this.shippingEstimatedDelivery = estimatedDelivery;
    },
    clearCart() {
      this.cart = [];
      this.cartLength = 0;
      this.shippingPrice = 0;
      this.shippingEstimatedDelivery = "";
    },
    addProductToCart(product:any) {
      const cartProduct = this.cart.find(prod => prod._id === product._id);

      if (!cartProduct) {
        this.pushProductToCart(product);
      } else {
        this.incrementProductQty(cartProduct);
      }

      this.incrementCartLength();
    },
  }
})
