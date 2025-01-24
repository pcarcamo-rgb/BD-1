import { Request, Response } from "express";
import { CreateProductDto } from "../dto/create-product.dto";
import { UpdateProductDto } from "../dto/update-product.dto";
import { CreateProduct } from "../use-cases/CreateProduct";
import { DeleteProduct } from "../use-cases/DeleteProduct";
import { GetProduct } from "../use-cases/GetProduct";
import { GetProductByID } from "../use-cases/GetProductByID";
import { UpdateProduct } from "../use-cases/UpdateProduct";

export class ProductController {
  constructor(
    readonly createProduct: CreateProduct,
    readonly getProduct: GetProduct,
    readonly getProductById: GetProductByID,
    readonly updateProduct: UpdateProduct,
    readonly deleteProduct: DeleteProduct
  ) {}

  async create(req: Request, res: Response) {
    try {
      const productData: CreateProductDto = req.body;
      const result = await this.createProduct.execute(productData);
      return res.status(201).json(result);
    } catch (error) {
      return this.handleError(res, error);
    }
  }

  async update(req: Request, res: Response) {
    try {
      const id = req.params.id;
      const productData: UpdateProductDto = req.body;
      const result = await this.updateProduct.execute(id, productData);
      return res.json(result);
    } catch (error) {
      return this.handleError(res, error);
    }
  }

  async findAll(_req: Request, res: Response) {
    try {
      const result = await this.getProduct.execute();
      return res.json(result);
    } catch (error) {
      return this.handleError(res, error);
    }
  }

  async findById(req: Request, res: Response) {
    try {
      const id = req.params.id;
      const result = await this.getProductById.execute(id);
      return res.json(result);
    } catch (error) {
      return this.handleError(res, error);
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const id = req.params.id;
      await this.deleteProduct.execute(id);
      return res.sendStatus(204);
    } catch (error) {
      return this.handleError(res, error);
    }
  }

  private handleError(res: Response, error: unknown) {
    console.error(error);

    if (error instanceof Error) {
      const isNotFound = error.message.includes("not found");
      return res.status(isNotFound ? 404 : 400).json({
        status: isNotFound ? 404 : 400,
        error: error.message,
      });
    }

    return res.status(500).json({
      status: 500,
      error: "Internal Server Error",
    });
  }
}
