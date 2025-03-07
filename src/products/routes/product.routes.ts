import express from "express";
import { ProductController } from "../controller/product.controller";
import { CreateProduct } from "../use-cases/CreateProduct";
import { DeleteProduct } from "../use-cases/DeleteProduct";
import { GetProduct } from "../use-cases/GetProduct";
import { GetProductByID } from "../use-cases/GetProductByID";
import { UpdateProduct } from "../use-cases/UpdateProduct";
import { MongoProductRepository } from "../repository/mongoProduct.repository";

const productRouter = express.Router();

const productRepository: MongoProductRepository = new MongoProductRepository();

const createProductUseCase = new CreateProduct(productRepository);
const getProductUseCase = new GetProduct(productRepository);
const getProductByIdUseCase = new GetProductByID(productRepository);
const updateProductUseCase = new UpdateProduct(productRepository);
const deleteProductUseCase = new DeleteProduct(productRepository);

export const productController = new ProductController(
  createProductUseCase,
  getProductUseCase,
  getProductByIdUseCase,
  updateProductUseCase,
  deleteProductUseCase
);

productRouter.post("/products", (req, res) => {
  productController.create(req, res);
});

productRouter.get("/products", (req, res) => {
  productController.findAll(req, res);
});

productRouter.get("/products/:id", (req, res) => {
  productController.findById(req, res);
});

productRouter.put("/products/:id", (req, res) => {
  productController.update(req, res);
});

productRouter.delete("/products/:id", (req, res) => {
  productController.delete(req, res);
});

export default productRouter;
