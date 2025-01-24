import { productRepository } from "../../products/repository/JsonProduct.repository";
import { JsonCartRepository } from "./JsonCart.repository";
export const cartRepository = new JsonCartRepository(productRepository);
