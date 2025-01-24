import express, { Request, Response } from "express";
import { CreateCart } from "../use-cases/CreateCart";
import { cartRepository } from "../repository";
import { DeleteCart } from "../use-cases/DeleteCart";
import { GetCarts } from "../use-cases/GetCarts";
import { GetCartByID } from "../use-cases/GetCartByID";
import { AddProduct } from "../use-cases/AddProduct";
import { CartController } from "../controller/cart.controller";

const cartRouter = express.Router();

const createCartUseCase = new CreateCart(cartRepository);
const deleteCartUseCase = new DeleteCart(cartRepository);
const getCartsUseCase = new GetCarts(cartRepository);
const getCartByIdUseCase = new GetCartByID(cartRepository);
const addProductUseCase = new AddProduct(cartRepository);

const cartController = new CartController(
  createCartUseCase,
  addProductUseCase,
  deleteCartUseCase,
  getCartByIdUseCase,
  getCartsUseCase
);

cartRouter.get("/carts", (req: Request, res: Response) => {
  cartController.findAll(req, res);
});

cartRouter.get("/carts/:id", (req: Request, res: Response) => {
  cartController.findById(req, res);
});

cartRouter.post("/carts", (req: Request, res: Response) => {
  cartController.create(req, res);
});

cartRouter.post("/carts/:id/products", (req: Request, res: Response) => {
  cartController.addProd(req, res);
});

cartRouter.delete("/carts/:id", (req: Request, res: Response) => {
  cartController.delete(req, res);
});

export default cartRouter;
