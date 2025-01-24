import { JsonProductRepository } from "../repository/JsonProduct.repository";

export class GetProduct {
  constructor(private productRepository: JsonProductRepository) {}

  async execute() {
    return await this.productRepository.findAll();
  }
}
