import { Cart } from "../entity/cart.entity";
import { JsonCartRepository } from "../repository/JsonCart.repository";
import { v4 } from "uuid";

export class CreateCart {
  constructor(private cartRepository: JsonCartRepository) {}
  async execute() {
    const id = v4();
    const newCart = new Cart(id, []);
    await this.cartRepository.save(newCart);
    return newCart;
  }
}
