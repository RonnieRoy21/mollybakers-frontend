import type { cartItem } from "./cartItem";

export class CartModel {
  //variables
  cartItems: cartItem[] = [];

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
