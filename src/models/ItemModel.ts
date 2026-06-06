export class CakeModel {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  quantity: number = 1;
  likes: number;
  isLiked: boolean;

  constructor(
    id: number,
    name: string,
    description: string,
    price: number,
    image: string,
    quantity: number,
    isLiked: boolean,
    likes: number,
  ) {
    this.description = description;
    this.id = id;
    this.quantity = quantity;
    this.image = image;
    this.isLiked = isLiked;
    this.likes = likes;
    this.name = name;
    this.price = price;
  }
}
