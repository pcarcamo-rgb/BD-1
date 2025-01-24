import { JsonCartRepository } from "../repository/JsonCart.repository";

export class DeleteCart {
  constructor(private cartRepository: JsonCartRepository) {}

  async execute(id: string) {
    if (!id.trim()) {
      throw new Error("Cart ID is required");
    }
    await this.cartRepository.delete(id);
  }
}
