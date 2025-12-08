"use client";

import { ShoppingBag, Trash } from "lucide-react";
import Image from "next/image";
import Container from "@/components/utils/Container";
import useStore from "../../../../store";
import Link from "next/link";
import { urlFor } from "@/sanity/lib/image";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { formatBDT as PriceFormatter } from "@/lib/price";
import { useState, useEffect } from "react";
import QuantityButtons from "@/components/QuantityButtons";
import EmptyCart from "@/components/EmptyCart";
import { useRouter } from "next/navigation";

const Page = () => {
  // ---- All Hooks MUST be at the top ----
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const groupedItems = useStore((s) => s.getGroupedItems());
  const getItemCount = useStore((s) => s.getItemCount);
  const getSubTotalPrice = useStore((s) => s.getSubTotalPrice);
  const getTotalPrice = useStore((s) => s.getTotalPrice);
  const deleteCartProduct = useStore((s) => s.removeItem);
  const resetCart = useStore((s) => s.clearCart);

  const [loading, setLoading] = useState(false);

  const handleResetCart = () => {
    const confirmed = window.confirm(
      "Are you sure you want to reset your cart?"
    );
    if (confirmed) {
      resetCart();
      toast.success("Cart reset successfully!");
    }
  };

  const router = useRouter();

  const handleCheckout = () => {
    if (!groupedItems?.length) {
      toast.error("Your cart is empty!");
      return;
    }

    // Navigate to checkout page
    router.push("/checkout"); // Replace with your checkout route
  };
  // ---- No early returns BEFORE hooks ----
  if (!mounted) {
    return (
      <section className="py-20">
        <Container>
          <div className="text-center py-20">Loading...</div>
        </Container>
      </section>
    );
  }

  // ------------------ UI ------------------
  return (
    <section className="py-20">
      <Container>
        {groupedItems?.length ? (
          <>
            <h1 className="text-2xl font-medium pb-2">Shopping Cart</h1>

            <div className="grid lg:grid-cols-3 md:gap-8">
              <div className="lg:col-span-2 rounded-lg">
                <div className="border bg-white rounded-lg">
                  {groupedItems?.map(({ product }) => {
                    const itemCount = getItemCount(product?._id);

                    return (
                      <div
                        key={product?._id}
                        className="border-b p-2.5 last:border-b-0 flex items-center justify-between gap-5"
                      >
                        <div className="flex flex-1 items-start gap-2 h-36 md:h-44">
                          {product?.images && (
                            <Link
                              href={`/product/${product?.slug?.current}`}
                              className="border  mr-2 rounded-lg overflow-hidden group"
                            >
                              <Image
                                src={urlFor(product?.images[0]).url()}
                                alt="productImage"
                                width={500}
                                height={500}
                                loading="lazy"
                                className="w-32 md:w-40 h-32 md:h-40 object-cover group-hover:scale-105 hoverEffect"
                              />
                            </Link>
                          )}

                          <div className="h-full flex flex-1 flex-col justify-between py-1">
                            <div className="flex flex-col gap-0.5 md:gap-1.5">
                              <h2 className="text-base font-semibold line-clamp-1">
                                {product?.name}
                              </h2>
                              <p className="text-sm capitalize">
                                Variant:{" "}
                                <span className="font-semibold">
                                  {product?.colorVariants?.[0]?.color ||
                                    "Default"}
                                </span>
                              </p>
                            </div>

                            <div className="flex items-center gap-2">
                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger>
                                    <Trash
                                      onClick={() => {
                                        deleteCartProduct(product?._id);
                                        toast.success(
                                          "Product deleted successfully!"
                                        );
                                      }}
                                      className="w-4 h-4 md:w-5 md:h-5 mr-1 text-gray-500 hover:text-red-600 hoverEffect"
                                    />
                                  </TooltipTrigger>
                                  <TooltipContent className="font-bold bg-red-600">
                                    Delete product
                                  </TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                            </div>
                          </div>
                        </div>

                        <div className="flex flex-col items-start justify-between h-36 md:h-44 p-0.5 md:p-1">
                          <span>
                            {PriceFormatter(
                              (product?.price as number) * itemCount
                            )}
                          </span>

                          <QuantityButtons product={product} />
                        </div>
                      </div>
                    );
                  })}

                  <Button
                    onClick={handleResetCart}
                    className="m-5 font-semibold"
                    variant="destructive"
                  >
                    Reset Cart
                  </Button>
                </div>
              </div>

              {/* ---------- Order Summary Desktop ---------- */}
              <div>
                <div className="lg:col-span-1">
                  <div className="hidden md:inline-block w-full bg-white p-6 rounded-lg border">
                    <h2 className="text-xl font-semibold mb-4">
                      Order Summary
                    </h2>

                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span>SubTotal</span>
                        <span>{PriceFormatter(getSubTotalPrice())}</span>
                      </div>

                      <div className="flex items-center justify-between">
                        <span>Discount</span>
                        <span>
                          {PriceFormatter(getSubTotalPrice() - getTotalPrice())}
                        </span>
                      </div>

                      <Separator />

                      <div className="flex items-center justify-between font-semibold text-lg">
                        <span>Total</span>
                        {PriceFormatter(getTotalPrice())}
                      </div>

                      <Button
                        className="w-full rounded-full font-semibold tracking-wide hoverEffect"
                        size="lg"
                        disabled={loading}
                        onClick={handleCheckout}
                      >
                        {loading ? "Please wait..." : "Proceed to Checkout"}
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              {/* ---------- Mobile Summary ---------- */}
              <div className="md:hidden fixed bottom-0 left-0 w-full bg-white pt-2">
                <div className="bg-white p-4 rounded-lg border mx-4">
                  <h2>Order Summary</h2>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span>SubTotal</span>
                      {PriceFormatter(getSubTotalPrice())}
                    </div>

                    <div className="flex items-center justify-between">
                      <span>Discount</span>
                      {PriceFormatter(getSubTotalPrice() - getTotalPrice())}
                    </div>

                    <Separator />

                    <div className="flex items-center justify-between font-semibold text-lg">
                      <span>Total</span>
                      <span className="text-lg font-bold text-black">
                        {PriceFormatter(getTotalPrice())}
                      </span>
                    </div>

                    <Button
                      className="w-full rounded-full font-semibold tracking-wide hoverEffect"
                      size="lg"
                      disabled={loading}
                      onClick={handleCheckout}
                    >
                      {loading ? "Please wait..." : "Proceed to Checkout"}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <EmptyCart />
        )}
      </Container>
    </section>
  );
};

export default Page;
