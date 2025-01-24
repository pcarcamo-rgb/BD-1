import { InMemoryProductRepository } from "../repository/inMemoryProduct.repository";

export class GetProduct {
  constructor(private productRepository: InMemoryProductRepository) {}

  async execute() {
    return await this.productRepository.findAll();
  }
}
