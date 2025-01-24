import { InMemoryProductRepository } from "../repository/inMemoryProduct.repository";

export class DeleteProduct {
  constructor(private productRepository: InMemoryProductRepository) {}

  async execute(id: string) {
    if (!id) throw new Error("Product ID is required");

    const exists = await this.productRepository.findById(id);
    if (!exists) {
      throw new Error("Product not found");
    }
    return await this.productRepository.delete(id);
  }
}
