import { MongoProductRepository } from "../repository/mongoProduct.repository";

export class GetProduct {
  constructor(private productRepository: MongoProductRepository) {}

  async execute(limit?: number, page?: number, sort?: string, query?: string) {
    return this.productRepository.findAll(limit, page, sort, query);
  }
}
