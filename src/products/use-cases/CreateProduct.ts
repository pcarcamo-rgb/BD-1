import { CreateProductDto } from "../dto/create-product.dto";
import { Product } from "../entity/product.entity";
import { InMemoryProductRepository } from "../repository/inMemoryProduct.repository";
import { v4 } from "uuid";

export class CreateProduct {
  constructor(private productRepository: InMemoryProductRepository) {}

  async execute(product: CreateProductDto) {
    if (!product.title?.trim()) {
      throw new Error("Title is required");
    }
    if (!product.description?.trim()) {
      throw new Error("Description is required");
    }
    if (isNaN(product.price) || product.price <= 0) {
      throw new Error("Valid price is required");
    }
    if (isNaN(product.stock) || product.stock < 0) {
      throw new Error("Valid stock quantity is required");
    }
    if (!product.category?.trim()) {
      throw new Error("Category is required");
    }
    if (!product.code?.trim()) {
      throw new Error("Product code is required");
    }
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
