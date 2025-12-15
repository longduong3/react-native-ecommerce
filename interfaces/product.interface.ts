export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: 'bicycle' | 'motorcycle';
  brand?: string;
  stock: number;
  rating?: number;
  reviews?: number;
  specifications?: Record<string, string>;
}

export type ProductCategory = 'bicycle' | 'motorcycle';
export type ProductFilter = {
  category?: ProductCategory;
  minPrice?: number;
  maxPrice?: number;
  brand?: string;
};

