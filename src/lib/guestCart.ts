import { Product } from "../../sanity.types";

type Variant = {
  color?: string;
  sizeLabel?: string;
  sizeInches?: string;
};

export type GuestCartItem = {
  product: Product;
  quantity: number;
  variant?: Variant;
  _key: string;
};

const GUEST_CART_KEY = "guest_cart";

export function getGuestCart(): GuestCartItem[] {
  if (typeof window === "undefined") return [];
  const cart = localStorage.getItem(GUEST_CART_KEY);
  return cart ? JSON.parse(cart) : [];
}

export function addToGuestCart(
  product: Product,
  quantity: number,
  variant?: Variant
) {
  const cart = getGuestCart();
  const _key = `${product._id}-${variant?.color || ""}-${variant?.sizeLabel || ""}-${variant?.sizeInches || ""}`;

  const existingIndex = cart.findIndex((item) => item._key === _key);
  if (existingIndex !== -1) {
    cart[existingIndex].quantity += quantity;
  } else {
    cart.push({ product, quantity, variant, _key });
  }

  localStorage.setItem(GUEST_CART_KEY, JSON.stringify(cart));
}

export function clearGuestCart() {
  localStorage.removeItem(GUEST_CART_KEY);
}
