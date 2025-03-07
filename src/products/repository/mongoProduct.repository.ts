import { ProductModel } from "../entity/product.model";
import { ProductResponse } from "../interfaces/productResponse.interface";
import { Product } from "../entity/product.entity";
import { ProductRepository } from "./product.repository";
import { UpdateProductDto } from "../dto/update-product.dto";

export class MongoProductRepository implements ProductRepository {
  async findAll(
    limit: number = 10,
    page: number = 1,
    sort: string = "asc",
    query: string = ""
  ): Promise<ProductResponse> {
    try {
      const filter = query ? { category: query } : {};
      const options = {
        limit,
        page,
        sort: sort ? { price: sort === "asc" ? 1 : -1 } : {},
        lean: true,
      };

      const products = await ProductModel.paginate<Product>(filter, options);

      return {
        status: "success",
        payload: products.docs as Product[],
        totalPages: products.totalPages,
        prevPage: products.prevPage,
        nextPage: products.nextPage,
        page: products.page,
        hasPrevPage: products.hasPrevPage,
        hasNextPage: products.hasNextPage,
        prevLink: products.hasPrevPage
          ? `/products?page=${products.prevPage}`
          : null,
        nextLink: products.hasNextPage
          ? `/products?page=${products.nextPage}`
          : null,
      };
    } catch (error) {
      throw new Error((error as Error).message);
    }
  }

  async save(product: Product) {
    try {
      const newProduct = new ProductModel(product);
      await newProduct.save();
      return;
    } catch (error) {
      throw new Error((error as Error).message);
    }
  }

  async findById(id: string): Promise<Product | null> {
    try {
      return await ProductModel.findById(id);
    } catch (error) {
      throw new Error((error as Error).message);
    }
  }

  async update(
    id: string,
    updateProductDto: UpdateProductDto
  ): Promise<Product | null> {
    try {
      return await ProductModel.findByIdAndUpdate(id, updateProductDto);
    } catch (error) {
      throw new Error((error as Error).message);
    }
  }

  async delete(id: string): Promise<void> {
    try {
      await ProductModel.findByIdAndDelete(id);
    } catch (error) {
      throw new Error((error as Error).message);
    }
  }
}
