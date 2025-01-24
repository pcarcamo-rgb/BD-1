import { InMemoryProductRepository } from "../repository/inMemoryProduct.repository";

export class DeleteProduct {
  constructor(private productRepository: InMemoryProductRepository) {}

  async execute(id: string) {
    return await this.productRepository.delete(id);
  }
}
