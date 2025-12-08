import React from "react";
import { Product } from "../../../sanity.types";
import { Button } from "../ui/button";
import { ShoppingBag } from "lucide-react";
import { cn } from "@/lib/utils";
import useStore from "../../../store";
import { toast } from "sonner";

interface Props {
  children: React.ReactNode;
  product: Product;
  className?: string;
  size: "default" | "sm" | "lg" | "icon" | "icon-sm" | "icon-lg";
  variant:
    | "link"
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost";
}

const AddToCartBtn = ({
  children,
  product,
  className,
  size,
  variant,
}: Props) => {
  const addItem = useStore((s) => s.addItem);
  const getItemCount = useStore((s) => s.getItemCount);

  if (!product?._id) {
    console.error("Product missing _id", product);
    return null;
  }

  const itemCount = getItemCount(product._id);
  const stock = Number(product?.stock ?? 0); // default unlimited
  const isOutOfStock = stock === 0;

  const handleAddToCart = () => {
    if (itemCount >= stock) {
      toast.error("No more stock available");
      return;
    }

    addItem(product);
    toast.success(`${product.name?.slice(0, 12)} added to cart`);
  };

  return (
    <Button
      variant={variant}
      size={size}
      className={cn("rounded-full cursor-pointer", className)}
      disabled={isOutOfStock}
      onClick={handleAddToCart}
    >
      {children}
    </Button>
  );
};

export default AddToCartBtn;
