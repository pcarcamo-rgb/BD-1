import mongoose, { Schema, Document, PaginateModel } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

export interface Product extends Document {
  title: string;
  description: string;
  price: number;
  category: string;
  stock: number;
  thumbnail: string;
}

const productSchema = new Schema<Product>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  stock: { type: Number, required: true },
  thumbnail: { type: String, required: false },
});

// Aplicar el plugin de paginación
productSchema.plugin(mongoosePaginate);

// **Exportar el modelo correctamente tipado**
export const ProductModel = mongoose.model<Product, PaginateModel<Product>>(
  "ProductModel",
  productSchema
);
