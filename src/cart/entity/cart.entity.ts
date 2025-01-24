import { ProductQuantity } from "../interface/cart-product.interface";

export class Cart {
  constructor(public id: string, public products: ProductQuantity[]) {}
}
