import { Router } from "express";
import { productController } from "../../products/routes/product.routes";
import { ViewController } from "../controller/views.controller";

const viewRouter = Router();

const viewController = new ViewController(productController);

viewRouter.get("/home", viewController.home.bind(viewController));

viewRouter.get(
  "/realtimeproducts",
  viewController.realtimeProducts.bind(viewController)
);

export default viewRouter;
