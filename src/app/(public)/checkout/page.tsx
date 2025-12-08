"use client";

import { useState, useEffect } from "react";
import { toast } from "sonner";

import Container from "@/components/utils/Container";
import { Button } from "@/components/ui/button";
import useStore from "../../../../store";
import { Address } from "../../../../sanity.types";
import { client } from "@/sanity/lib/client";
import { createOrder, saveAddress } from "@/sanity/lib/order";
import { SignInButton, SignUpButton, useUser } from "@clerk/nextjs";

export default function CheckoutPage() {
  const { user, isSignedIn } = useUser();
  const userId = user?.id;

  // ----------------------------
  // Hooks must always be top-level
  // ----------------------------
  const cartItems = useStore((state) => state.items);
  const getTotalPrice = useStore((state) => state.getTotalPrice);
  const clearCart = useStore((state) => state.clearCart);

  const [loading, setLoading] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);
  const [newAddress, setNewAddress] = useState<
    Omit<Address, "_id" | "_type" | "_createdAt" | "_updatedAt" | "_rev">
  >({
    fullName: "",
    phone: "",
    division: undefined,
    district: "",
    upazila: "",
    postcode: "",
    streetAddress: "",
    userId: "", // initialize safely
  });
  const [savedAddresses, setSavedAddresses] = useState<Address[]>([]);
  const [mounted, setMounted] = useState(false);

  // ----------------------------
  // Guarded useEffect to fetch saved addresses
  // ----------------------------
  useEffect(() => {
    if (!userId) return; // only fetch when userId exists
    const fetchAddresses = async () => {
      const query = `*[_type == "address" && userId == $userId] | order(_createdAt desc){
        _id, _type, _createdAt, _updatedAt, _rev,
        fullName, phone, division, district, upazila, postcode, streetAddress, userId
      }`;
      const result: Address[] = await client.fetch(query, { userId });
      setSavedAddresses(result);
    };
    fetchAddresses();
  }, [userId]);

  // ----------------------------
  // Update newAddress.userId once userId exists
  // ----------------------------
  useEffect(() => {
    if (userId) {
      setNewAddress((prev) => ({ ...prev, userId }));
    }
  }, [userId]);

  // ----------------------------
  // Mounted flag for SSR safe render
  // ----------------------------
  useEffect(() => {
    setMounted(true);
  }, []);

  // ----------------------------
  // Early return for unsigned users
  // ----------------------------
  if (!isSignedIn || !userId) {
    return (
      <Container className="h-screen flex items-center justify-center">
        <div className="border rounded-lg flex items-center flex-col p-4">
          <h1 className="text-2xl font-medium">Checkout</h1>
          <p className="">Please sign in to proceed to checkout.</p>

          <SignInButton>
            <Button className="w-full mt-4">Sign In</Button>
          </SignInButton>
          <p className="py-2 text-muted-foreground text-sm">
            Don't have an account?
          </p>
          <SignUpButton>
            <Button className="w-full" variant={"outline"}>
              Sign Up
            </Button>
          </SignUpButton>
        </div>
      </Container>
    );
  }

  // ----------------------------
  // Handlers
  // ----------------------------
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setNewAddress({ ...newAddress, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = async () => {
    if (!cartItems.length) return toast.error("Cart is empty!");
    if (!selectedAddress && !newAddress.fullName)
      return toast.error("Please select or fill an address");

    setLoading(true);
    try {
      // 1️⃣ Save new address if no existing selected
      let addressToUse: Address;
      if (selectedAddress) {
        addressToUse = selectedAddress;
      } else {
        const saved = await saveAddress(userId, newAddress);
        addressToUse = saved as Address;
      }

      // 2️⃣ Save order
      await createOrder(userId, cartItems, addressToUse._id, getTotalPrice());

      toast.success("Order placed successfully!");
      clearCart();
      setSelectedAddress(null);
      setNewAddress({
        fullName: "",
        phone: "",
        division: undefined,
        district: "",
        upazila: "",
        postcode: "",
        streetAddress: "",
        userId,
      });
    } catch (err) {
      console.error(err);
      toast.error("Failed to place order");
    } finally {
      setLoading(false);
    }
  };

  // ----------------------------
  // Render
  // ----------------------------
  return (
    <Container>
      <h1 className="text-2xl font-bold mb-6">Checkout</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Address Section */}
        <div className="bg-white p-6 rounded-lg border">
          <h2 className="text-xl font-semibold mb-4">Shipping Address</h2>

          {savedAddresses.length > 0 && (
            <div className="mb-4">
              <label className="block font-medium mb-2">
                Select Saved Address
              </label>
              <select
                value={selectedAddress?._id || ""}
                onChange={(e) => {
                  const addr =
                    savedAddresses.find((a) => a._id === e.target.value) ||
                    null;
                  setSelectedAddress(addr);
                }}
                className="w-full border p-2 rounded"
              >
                <option value="">-- Use New Address --</option>
                {savedAddresses.map((addr) => (
                  <option key={addr._id} value={addr._id}>
                    {addr.fullName}, {addr.streetAddress}, {addr.district}
                  </option>
                ))}
              </select>
            </div>
          )}

          {!selectedAddress && (
            <>
              {Object.keys(newAddress).map((key) => {
                if (key === "userId") return null; // skip userId field
                const value = newAddress[key as keyof typeof newAddress] || "";
                return (
                  <div key={key} className="mb-3">
                    <label className="block font-medium mb-1 capitalize">
                      {key}
                    </label>
                    {key === "division" ? (
                      <select
                        name={key}
                        value={value}
                        onChange={handleChange}
                        className="w-full border p-2 rounded"
                      >
                        <option value="">Select Division</option>
                        {[
                          "Dhaka",
                          "Chittagong",
                          "Rajshahi",
                          "Khulna",
                          "Barisal",
                          "Sylhet",
                          "Rangpur",
                          "Mymensingh",
                        ].map((div) => (
                          <option key={div} value={div}>
                            {div}
                          </option>
                        ))}
                      </select>
                    ) : key === "streetAddress" ? (
                      <textarea
                        name={key}
                        value={value}
                        onChange={handleChange}
                        className="w-full border p-2 rounded"
                        rows={3}
                      />
                    ) : (
                      <input
                        type="text"
                        name={key}
                        value={value}
                        onChange={handleChange}
                        className="w-full border p-2 rounded"
                      />
                    )}
                  </div>
                );
              })}
            </>
          )}
        </div>

        {/* Cart Summary */}
        <div className="bg-white p-6 rounded-lg border">
          <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
          {cartItems.map((item) => {
            const key =
              item.product._id +
              (item.variant?.color || "") +
              (item.variant?.sizeLabel || "");
            return (
              <div key={key} className="flex justify-between mb-2">
                <span>
                  {item.product.name} x {item.quantity}
                </span>
                <span>${(item?.product?.price || 0) * item.quantity}</span>
              </div>
            );
          })}
          <hr className="my-3" />
          <div className="flex justify-between font-semibold text-lg">
            <span>Total</span>
            <span>{mounted ? `$${getTotalPrice()}` : "$0"}</span>
          </div>
          <Button
            className="w-full mt-4"
            onClick={handlePlaceOrder}
            disabled={loading}
          >
            {loading ? "Placing Order..." : "Place Order"}
          </Button>
        </div>
      </div>
    </Container>
  );
}
