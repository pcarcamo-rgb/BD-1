import { UpdateProductDto } from "../dto/update-product.dto";
import { Product } from "../entity/product.entity";
import { ProductResponse } from "../interfaces/productResponse.interface";

export interface ProductRepository {
  save(product: Product): Promise<void>;
  findById(id: string): Promise<Product | null>;
  findAll(
    limit?: number,
    page?: number,
    sort?: string,
    query?: string
  ): Promise<Product[] | [] | ProductResponse>;
  update(
    id: string,
    updateProductDto: UpdateProductDto
  ): Promise<Product | null>;
  delete(id: string): Promise<void>;
}
