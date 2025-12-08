"use client";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { Flame, ShoppingBag } from "lucide-react";
import { Product } from "../../../sanity.types";

import Link from "next/link";
import { getImageUrl } from "@/lib/getImageUrl";
import { Badge } from "../ui/badge";
import { formatBDT } from "@/lib/price";
import AddToCartBtn from "../cart/AddToCartBtn";

interface ProductCardProps {
  product: Product;
  className?: string;
}

const ProductCard = ({ product, className }: ProductCardProps) => {
  return (
    <div
      className={cn(
        "w-full h-fit group hover:shadow-2xl hover:-translate-1 bg-white p-1 border rounded-lg hoverEffect",
        className
      )}
    >
      {product?.images && (
        <div className="relative w-full h-full overflow-hidden rounded-lg ">
          <Link
            href={`/product/${product.slug?.current}`}
            className="cursor-pointer"
          >
            <Image
              src={getImageUrl(product?.images[0])}
              alt={product.name || "Product Image"}
              height={400}
              width={400}
              className="w-full h-full object-cover border group-hover:scale-110 hoverEffect"
            />
          </Link>
          {product.stock != 0 ? (
            <>
              {product.isNew && (
                <Badge className="absolute top-2 left-2 bg-emerald-500">
                  New!
                </Badge>
              )}
              {product.isHotDeal && (
                <span className="absolute top-2 right-2 bg-orange-500 p-2 rounded-full text-white">
                  <Flame className="size-4" />
                </span>
              )}
            </>
          ) : (
            <></>
          )}
        </div>
      )}
      <div className="p-2">
        <p className="uppercase text-muted-foreground text-xs ">
          {product.category?.name}
        </p>
        <h1 className="font-heading text-sm md:text-base">{product.name}</h1>
        {product.stock === 0 ? (
          <span className="w-full flex justify-center py-1 border rounded-lg mt-1 text-muted-foreground text-sm md:text-base">
            out of stock
          </span>
        ) : (
          <div className="flex items-baseline justify-between gap-2">
            <div className="flex items-baseline gap-1">
              {product.discountPrice && (
                <span className="text-base md:text-lg">
                  {formatBDT(product.discountPrice)}
                </span>
              )}{" "}
              <span
                className={
                  product.discountPrice
                    ? "line-through text-xs md:text-sm text-muted-foreground"
                    : "text-base md:text-lg"
                }
              >
                {formatBDT(product.price || 0)}
              </span>
            </div>
            <AddToCartBtn size="icon" variant="outline" product={product}>
              <ShoppingBag />
            </AddToCartBtn>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
