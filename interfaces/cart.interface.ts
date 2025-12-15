import { Product } from './product.interface';

export interface CartItem {
  productId: string;
  quantity: number;
  productSnapshot: Product;
}

export interface Cart {
  items: CartItem[];
  total: number;
  itemCount: number;
}

