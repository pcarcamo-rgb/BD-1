import { JsonCartRepository } from "../repository/JsonCart.repository";

export class AddProduct {
  constructor(private cartRepository: JsonCartRepository) {}

  async execute(id: string, idProd: string) {
    if (!id.trim()) {
      throw new Error("The cart id is required");
    }
    if (!idProd.trim()) {
      throw new Error("The product id is required");
    }

    const cart = await this.cartRepository.addProduct(id, idProd);

    return cart;
  }
}
