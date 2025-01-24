import { JsonCartRepository } from "../repository/JsonCart.repository";


export class GetCartByID {
  constructor(private cartRepository: JsonCartRepository) {}
  async execute(id: string) {
    if (!id.trim()) throw new Error("Cart ID is required");
    const cart = this.cartRepository.findById(id);
    return cart;
  }
}
