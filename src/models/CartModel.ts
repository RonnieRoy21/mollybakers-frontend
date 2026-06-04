import type { cartItem } from "./cartItem";

export class CartModel {
  //variables
  cartItems: cartItem[] = [];

  //add to cart
  public addToCart(item: cartItem) {
    if (this.cartItems.includes(item)) {
      return this.cartItems;
    }
    this.cartItems.push(item);
    return this.cartItems;
  }
  //remove from cart
  public removeFromCart(item: cartItem) {
    if (this.cartItems.includes(item)) {
      this.cartItems.filter((i) => i !== item);
      return;
    }
    return;
  }
  public likeItem(item: cartItem) {
    if (item.isLiked) {
      item.likes = item.likes + 1;
      return item;
    }
    item.likes = item.likes - 1;
    return item;
  }
  //tojson
  //fromjson
}
