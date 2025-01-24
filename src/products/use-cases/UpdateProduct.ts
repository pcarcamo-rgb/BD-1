import { UpdateProductDto } from "../dto/update-product.dto";
import { JsonProductRepository } from "../repository/JsonProduct.repository";

export class UpdateProduct {
  constructor(private productRepository: JsonProductRepository) {}
  async execute(id: string, updateProductDto: UpdateProductDto) {
    if (!id) throw new Error("Product ID is required");

    if (
      updateProductDto.price &&
      (isNaN(updateProductDto.price) || updateProductDto.price <= 0)
    ) {
      throw new Error("Invalid price value");
    }

    if (
      updateProductDto.stock &&
      (isNaN(updateProductDto.stock) || updateProductDto.stock < 0)
    ) {
      throw new Error("Invalid stock quantity");
    }
    return await this.productRepository.update(id, updateProductDto);
  }
}
