import { Product } from "../entity/product.entity";

export interface ProductResponse {
  status: string;
  payload: Product[];
  totalPages: number;
  prevPage: number | null | undefined;
  nextPage: number | null | undefined;
  page: number | undefined;
  hasPrevPage: boolean;
  hasNextPage: boolean;
  prevLink?: string | null;
  nextLink?: string | null;
}
