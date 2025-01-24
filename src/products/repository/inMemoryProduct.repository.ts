import { UpdateProductDto } from "../dto/update-product.dto";
import { Product } from "../entity/product.entity";
import { ProductRepository } from "./product.repository";

export class InMemoryProductRepository implements ProductRepository {
  private products: Product[] = [];

  async save(product: Product): Promise<void> {
    this.products.push(product);
  }

  async findById(id: string): Promise<Product> {
    const product = this.products.find((product) => product.id === id) || null;
    if (!product) throw new Error(`Product with id ${id} not found.`);
    return product;
  }

  async findAll(): Promise<Product[] | []> {
    return this.products;
  }

  async update(
    id: string,
    updateProductDto: UpdateProductDto
  ): Promise<Product | null> {
    const product = await this.findById(id);
    const productIndex = this.products.findIndex((prod) => prod.id === id);
    Object.assign(product, updateProductDto);

    this.products[productIndex] = product;

    return product;
  }

  async delete(id: string): Promise<void> {
    this.products = this.products.filter((prod) => prod.id !== id);
  }
}
