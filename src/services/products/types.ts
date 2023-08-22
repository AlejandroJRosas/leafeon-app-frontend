export interface Product {
  productId: number;
  name: string;
  price: number;
  quantity: number;
  profit: number;
  createdAt: string;
}

export type ProductPayload = Omit<Product, "productId" | "quantity" | "profit" | "createdAt">;
