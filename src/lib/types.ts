export type Product = {
  id: string;
  name: string;
  price: number;
  category: string;
  condition: string | null;
  image_url: string | null;
  description: string | null;
  in_stock: boolean;
  created_at: string;
};

export type ProductInput = Omit<Product, "id" | "created_at">;
