import { Request, Response } from "express";
import { ProductController } from "../../products/controller/product.controller";

export class ViewController {
  constructor(private productController: ProductController) {}

  async home(req: Request, res: Response) {
    try {
      const products = await this.productController.getProduct.execute(); // Obtener productos
      res.render("home", { products });
    } catch (error) {
      console.log(error);
      res.status(500).send("Error al obtener los productos");
    }
  }

  async realtimeProducts(req: Request, res: Response) {
    try {
      const products = await this.productController.getProduct.execute();
      res.render("realtimeproducts", { products });
    } catch (error) {
      console.log(error);
      res.status(500).send("Error al obtener los productos");
    }
  }
}
