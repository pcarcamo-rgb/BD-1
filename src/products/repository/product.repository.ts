import { UpdateProductDto } from "../dto/update-product.dto";
import { Product } from "../entity/product.entity";

export interface ProductRepository {
  save(product: Product): Promise<void>;
  findById(id: string): Promise<Product | null>;
  findAll(): Promise<Product[] | []>;
  update(
    id: string,
    updateProductDto: UpdateProductDto
  ): Promise<Product | null>;

  delete(id: string): Promise<void>;
}
