import { CreateProductDto } from "../dto/create-product.dto";
import { Product } from "../entity/product.entity";
import { InMemoryProductRepository } from "../repository/inMemoryProduct.repository";
import { v4 } from "uuid";

export class CreateProduct {
  constructor(private productRepository: InMemoryProductRepository) {}

  async execute(product: CreateProductDto) {
    const id = v4();
    const newProduct = new Product(
      id,
      product.title,
      product.description,
      product.code,
      product.price,
      product.stock,
      product.category,
      product.thumbnails || undefined,
      product.status || undefined
    );
    return await this.productRepository.save(newProduct);
  }
}
