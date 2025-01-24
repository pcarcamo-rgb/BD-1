import { Request, Response } from "express";
import { CreateProductDto } from "../dto/create-product.dto";
import { InMemoryProductRepository } from "../repository/inMemoryProduct.repository";
import { CreateProduct } from "../use-cases/CreateProduct";
import { GetProduct } from "../use-cases/GetProduct";
import { GetProductByID } from "../use-cases/GetProductByID";
import { DeleteProduct } from "../use-cases/DeleteProduct";
import { UpdateProductDto } from "../dto/update-product.dto";
import { UpdateProduct } from "../use-cases/UpdateProduct";

export class ProductController {
  constructor(private productRepository: InMemoryProductRepository) {}

  async createProduct(req: Request, res: Response) {
    try {
      const productData: CreateProductDto = req.body;

      if (
        !productData.title ||
        !productData.description ||
        isNaN(productData.price) ||
        isNaN(productData.stock) ||
        !productData.category ||
        !productData.code
      ) {
        return res.status(400).json({ error: "Invalid product data" });
      }
      const createProduct = new CreateProduct(this.productRepository);
      const newProduct = await createProduct.execute(productData);

      return res.status(201).json(newProduct);
    } catch (e) {
      console.error(e);
      return res.status(500).json({ status: 500, error: e });
    }
  }

  async updateProduct(req: Request, res: Response) {
    try {
      const id = req.params.id;
      const productData: UpdateProductDto = req.body;

      if (!id || !productData)
        return res.status(500).json({ status: 500, error: "Invalid Data" });

      const updateProduct = new UpdateProduct(this.productRepository);

      return await updateProduct.execute(id, productData);
    } catch (e) {
      console.error(e);
      return res.status(500).json({ status: 500, error: e });
    }
  }

  async findAllProducts(req: Request, res: Response) {
    try {
      const findProducts = new GetProduct(this.productRepository);

      const products = await findProducts.execute();

      return res.json(products);
    } catch (e) {
      console.error(e);
      return res.status(500).json({ status: 500, error: e });
    }
  }

  async findProductByID(req: Request, res: Response) {
    try {
      const id = req.params.id;
      const findProductByID = new GetProductByID(this.productRepository);
      const product = findProductByID.execute(id);

      return product;
    } catch (e) {
      console.error(e);
      return res.status(500).json({ status: 500, error: e });
    }
  }

  async deleteProduct(req: Request, res: Response) {
    try {
      const id = req.params.id;
      const deleteProduct = new DeleteProduct(this.productRepository);

      await deleteProduct.execute(id);
      return res.status(200);
    } catch (e) {
      console.error(e);
      return res.status(500).json({ status: 500, error: e });
    }
  }
}
