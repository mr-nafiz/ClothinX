export interface Category {
  id: number;
  name: string;
  slug: string;
  icon: string;
}

export interface Brand {
  id: number;
  name: string;
  slug: string;
}

export interface Variant {
  id: string;
  name: string;
  additionalPrice?: number;
  stock: number;
  images?: string[];
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  description: string;
  price: number;
  category: string; // slug
  brand: string; // slug
  images: string[];
  variants?: Variant[];
  rating: number;
  stock: number;
  isNew?: boolean;
}
