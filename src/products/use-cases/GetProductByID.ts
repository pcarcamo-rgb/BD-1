import { InMemoryProductRepository } from "../repository/inMemoryProduct.repository";

export class GetProductByID {
  constructor(private productRepository: InMemoryProductRepository) {}
  async execute(id: string) {
    return await this.productRepository.findById(id);
  }
}
