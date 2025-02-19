// store/cartStore.js
import { makeAutoObservable } from "mobx";

class CartStore {
  items = [];

  constructor() {
    makeAutoObservable(this);
  }

  addToCart(product) {
    const existingItem = this.items.find((item) => item.id === product.id);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      this.items.push({ ...product, quantity: 1 });
    }
  }

  removeFromCart(productId) {
    this.items = this.items.filter((item) => item.id !== productId);
  }

  get totalItems() {
    return this.items.reduce((total, item) => total + item.quantity, 0);
  }
}

const cartStore = new CartStore();
export default cartStore;