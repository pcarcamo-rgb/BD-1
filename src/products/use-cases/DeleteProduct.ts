import { JsonProductRepository } from "../repository/JsonProduct.repository";

export class DeleteProduct {
  constructor(private productRepository: JsonProductRepository) {}

  async execute(id: string) {
    if (!id.trim()) throw new Error("Product ID is required");

    const exists = await this.productRepository.findById(id);
    if (!exists) {
      throw new Error("Product not found");
    }
    await this.productRepository.delete(id);
  }
}
