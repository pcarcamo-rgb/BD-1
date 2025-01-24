import { Request, Response } from "express";
import { AddProduct } from "../use-cases/AddProduct";
import { CreateCart } from "../use-cases/CreateCart";
import { DeleteCart } from "../use-cases/DeleteCart";
import { GetCartByID } from "../use-cases/GetCartByID";
import { GetCarts } from "../use-cases/GetCarts";

export class CartController {
  constructor(
    readonly createCart: CreateCart,
    readonly addProduct: AddProduct,
    readonly deleteCart: DeleteCart,
    readonly getCartByID: GetCartByID,
    readonly getCarts: GetCarts
  ) {}

  async create(_req: Request, res: Response) {
    try {
      const result = await this.createCart.execute();
      return res.status(201).json(result);
    } catch (error) {
      this.handleError(res, error);
    }
  }

  async findAll(_req: Request, res: Response) {
    try {
      const carts = await this.getCarts.execute();
      return res.json(carts);
    } catch (error) {
      return this.handleError(res, error);
    }
  }

  async findById(req: Request, res: Response) {
    try {
      const id = req.params.id;
      const cart = await this.getCartByID.execute(id);
      return cart;
    } catch (error) {
      return this.handleError(res, error);
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const id = req.params.id;
      await this.deleteCart.execute(id);
      return res
        .status(200)
        .json({ status: 200, message: `Cart with id ${id} deleted.` });
    } catch (error) {
      return this.handleError(res, error);
    }
  }

  async addProd(req: Request, res: Response) {
    try {
      const id = req.params.id;
      const { idProduct } = req.body;
      const cart = await this.addProduct.execute(id, idProduct);
      return res.json(cart);
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
