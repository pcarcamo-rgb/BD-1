import { JsonCartRepository } from "../repository/JsonCart.repository";

export class GetCarts {
  constructor(private cartRepository: JsonCartRepository) {}

  async execute() {
    const carts = await this.cartRepository.findAll();
    return carts;
  }
}
