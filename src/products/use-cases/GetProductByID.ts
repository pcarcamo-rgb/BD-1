import { InMemoryProductRepository } from "../repository/inMemoryProduct.repository";

export class GetProductByID {
  constructor(private productRepository: InMemoryProductRepository) {}
  async execute(id: string) {
    if (!id) throw new Error("Product ID is required");

    const product = await this.productRepository.findById(id);
    if (!product) {
      throw new Error("Product not found");
    }
    return await this.productRepository.findById(id);
  }
}
