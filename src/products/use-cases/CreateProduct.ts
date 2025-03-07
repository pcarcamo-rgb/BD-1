import { CreateProductDto } from "../dto/create-product.dto";
import { Product } from "../entity/product.entity";
import { v4 } from "uuid";
import { MongoProductRepository } from "../repository/mongoProduct.repository";

export class CreateProduct {
  constructor(private productRepository: MongoProductRepository) {}

  async execute(product: CreateProductDto) {
    if (!product.title?.trim()) {
      throw new Error("'title' is required");
    }
    if (!product.description?.trim()) {
      throw new Error("'description' is required");
    }
    if (isNaN(product.price) || product.price <= 0) {
      throw new Error("Valid 'price' is required");
    }
    if (isNaN(product.stock) || product.stock < 0) {
      throw new Error("Valid 'stock' quantity is required");
    }
    if (!product.category?.trim()) {
      throw new Error("'category' is required");
    }
    if (!product.code?.trim()) {
      throw new Error("Product 'code' is required");
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
    await this.productRepository.save(newProduct);
    return newProduct;
  }
}
