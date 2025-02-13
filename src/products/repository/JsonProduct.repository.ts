import { promises as fs } from "fs";
import path from "path";
import { UpdateProductDto } from "../dto/update-product.dto";
import { Product } from "../entity/product.entity";
import { ProductRepository } from "./product.repository";

const PRODUCTS_FILE_PATH = path.join(__dirname, "../../../db/products.json");
const DB_DIRECTORY = path.join(__dirname, "../../../db");

export class JsonProductRepository implements ProductRepository {
  constructor() {
    this.initializeProductsFile();
  }

  private async initializeProductsFile(): Promise<void> {
    try {
      await fs.access(DB_DIRECTORY);
    } catch (error) {
      if (
        error instanceof Error &&
        "code" in error &&
        error.code === "ENOENT"
      ) {
        await fs.mkdir(DB_DIRECTORY, { recursive: true });
        console.log("Carpeta 'db' creada exitosamente.");
      } else {
        throw error;
      }
    }

    try {
      await fs.readFile(PRODUCTS_FILE_PATH, "utf-8");
    } catch (error) {
      if (
        error instanceof Error &&
        "code" in error &&
        error.code === "ENOENT"
      ) {
        await fs.writeFile(
          PRODUCTS_FILE_PATH,
          JSON.stringify([], null, 2),
          "utf-8"
        );
        console.log("products.json creado exitosamente.");
      } else {
        throw error;
      }
    }
  }

  private async readProductsFile(): Promise<Product[]> {
    const data = await fs.readFile(PRODUCTS_FILE_PATH, "utf-8");
    return JSON.parse(data) as Product[];
  }

  private async writeProductsFile(products: Product[]): Promise<void> {
    await fs.writeFile(
      PRODUCTS_FILE_PATH,
      JSON.stringify(products, null, 2),
      "utf-8"
    );
  }

  async save(product: Product): Promise<void> {
    const products = await this.readProductsFile();
    products.push(product);
    await this.writeProductsFile(products);
  }

  async findById(id: string): Promise<Product> {
    const products = await this.readProductsFile();
    const product = products.find((product) => product.id === id);
    if (!product) throw new Error(`Product with id ${id} not found.`);
    return product;
  }

  async findAll(): Promise<Product[] | []> {
    return await this.readProductsFile();
  }

  async update(
    id: string,
    updateProductDto: UpdateProductDto
  ): Promise<Product | null> {
    const products = await this.readProductsFile();
    const product = products.find((prod) => prod.id === id);
    if (!product) throw new Error(`Product with id ${id} not found.`);

    Object.assign(product, updateProductDto);

    await this.writeProductsFile(products);
    return product;
  }

  async delete(id: string): Promise<void> {
    const products = await this.readProductsFile();
    const updatedProducts = products.filter((prod) => prod.id !== id);
    await this.writeProductsFile(updatedProducts);
  }
}

export const productRepository = new JsonProductRepository();
