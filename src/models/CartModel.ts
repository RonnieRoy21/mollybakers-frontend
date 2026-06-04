import type { cartItem } from "./cartItem";

export class CartModel {
  //variables
  cartItems: cartItem[] = [];

  //add to cart
  public addToCart(item: cartItem) {
    this.cartItems.push(item);
    return this.cartItems;
  }
  //remove from cart
  public removeFromCart(item: cartItem) {
    this.cartItems = this.cartItems.filter((i) => i !== item);
    return this.cartItems;
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
