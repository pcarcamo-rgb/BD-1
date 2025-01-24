import { UpdateProductDto } from "../dto/update-product.dto";
import { InMemoryProductRepository } from "../repository/inMemoryProduct.repository";

export class UpdateProduct {
  constructor(private productRepository: InMemoryProductRepository) {}
  async execute(id: string, updateProductDto: UpdateProductDto) {
    return await this.productRepository.update(id, updateProductDto);
  }
}
