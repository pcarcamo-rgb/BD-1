export interface CreateProductDto {
  title: string;
  description: string;
  code: string;
  price: number;
  stock: number;
  category: string;
  thumbnails?: string[];
  status?: boolean;
}
