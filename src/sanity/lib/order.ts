// lib/sanity/order.ts
import { CartItem } from "../../../store";
import { serverClient } from "./serverClient";

// Save address to Sanity
export async function saveAddress(userId: string, address: any) {
  const result = await serverClient.create({
    _type: "address",
    userId,
    ...address,
  });
  return result; // returns the saved document with _id
}

// Create order referencing address
export async function createOrder(
  userId: string,
  cart: CartItem[],
  addressId: string,
  totalAmount: number
) {
  const items = cart.map((item) => ({
    product: { _ref: item.product._id, _type: "reference" },
    quantity: item.quantity,
    variant: item.variant || {},
  }));

  return serverClient.create({
    _type: "order",
    userId,
    items,
    address: { _ref: addressId, _type: "reference" },
    totalAmount,
    paymentStatus: "pending",
    orderStatus: "processing",
    createdAt: new Date().toISOString(),
  });
}
