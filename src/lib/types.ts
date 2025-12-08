// types/cart.ts
import { CartItem as ZustandCartItem } from "../../store";

export type SanityCartItem = {
  _key?: string;
  product: { _ref: string }; // reference to product
  quantity: number;
  variant?: {
    color?: string;
    sizeInches?: string;
    sizeLabel?: string;
  };
};

export type SanityCart = {
  _id?: string;
  userId: string;
  items: SanityCartItem[];
};

export const mapZustandToSanity = (
  cart: ZustandCartItem[]
): SanityCartItem[] => {
  return cart.map((item) => ({
    product: { _ref: item.product._id },
    quantity: item.quantity,
    variant: item.variant,
  }));
};
