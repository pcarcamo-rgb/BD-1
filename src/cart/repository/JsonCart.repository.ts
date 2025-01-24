import { promises as fs } from "fs"; // Para manejar operaciones de archivo asíncronas
import path from "path"; // Para manejar rutas de archivo

import { Cart } from "../entity/cart.entity";
import { CartRepository } from "./cart.repository";
import { JsonProductRepository } from "../../products/repository/JsonProduct.repository";

const CART_FILE_PATH = path.join(__dirname, "../../../db/cart.json");

export class JsonCartRepository implements CartRepository {
  constructor(private jsonProductRepository: JsonProductRepository) {
    this.initializeCartFile();
  }

  private async initializeCartFile(): Promise<void> {
    try {
      await fs.readFile(CART_FILE_PATH, "utf-8");
    } catch (error) {
      if (error instanceof Error) {
        await fs.writeFile(
          CART_FILE_PATH,
          JSON.stringify([], null, 2),
          "utf-8"
        );
        console.log("cart.json creado exitosamente.");
      } else {
        throw error;
      }
    }
  }

  private async readCartsFile(): Promise<Cart[]> {
    const data = await fs.readFile(CART_FILE_PATH, "utf-8");
    return JSON.parse(data) as Cart[];
  }

  private async writeCartsFile(carts: Cart[]): Promise<void> {
    await fs.writeFile(CART_FILE_PATH, JSON.stringify(carts, null, 2), "utf-8");
  }

  async addProduct(id: string, idProd: string): Promise<Cart> {
    const carts = await this.readCartsFile();
    const cart = carts.find((c) => c.id === id);
    if (!cart) throw new Error(`Cart with id ${id} not found.`);

    const index = cart.products.findIndex((prod) => prod.idProduct === idProd);
    await this.jsonProductRepository.findById(idProd);

    if (index !== -1) {
      cart.products[index].quantity++;
    } else {
      cart.products.push({ idProduct: idProd, quantity: 1 });
    }

    await this.writeCartsFile(carts);
    return cart;
  }

  async delete(id: string): Promise<void> {
    const carts = await this.readCartsFile();
    const updatedCarts = carts.filter((cart) => cart.id !== id);
    await this.writeCartsFile(updatedCarts);
  }

  async findAll(): Promise<Cart[]> {
    return await this.readCartsFile();
  }

  async findById(id: string): Promise<Cart> {
    const carts = await this.readCartsFile();
    const cart = carts.find((c) => c.id === id);
    if (!cart) throw new Error(`Cart with id ${id} not found.`);
    return cart;
  }

  async save(cart: Cart): Promise<void> {
    const carts = await this.readCartsFile();
    carts.push(cart);
    await this.writeCartsFile(carts);
  }
}
