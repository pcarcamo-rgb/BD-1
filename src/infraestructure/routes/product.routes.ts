import express, { Request, Response } from "express";
import { InMemoryProductRepository } from "../../products/repository/inMemoryProduct.repository";
import { ProductController } from "../../products/controller/product.controller";

const productRouter = express.Router();
const productRepository = new InMemoryProductRepository();
const productController = new ProductController(productRepository);

productRouter.post("/products", (req: Request, res: Response) => {
  productController.createProduct(req, res);
});

productRouter.get("/products/:id", (req: Request, res: Response) => {
  productController.findProductByID(req, res);
});

productRouter.get("/products", (req: Request, res: Response) => {
  productController.findAllProducts(req, res);
});

productRouter.put("/products/:id", (req: Request, res: Response) => {
  productController.updateProduct(req, res);
});

productRouter.delete("/products/:id", (req: Request, res: Response) => {
  productController.deleteProduct(req, res);
});

export default productRouter;
