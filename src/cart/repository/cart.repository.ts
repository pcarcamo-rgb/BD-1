import { Cart } from "../entity/cart.entity";

export interface CartRepository {
  save(cart: Cart): Promise<void>;
  findById(id: string): Promise<Cart>;
  findAll(): Promise<Cart[]>;
  delete(id: string): Promise<void>;
  addProduct(id: string, idProduct: string): Promise<Cart>;
}
