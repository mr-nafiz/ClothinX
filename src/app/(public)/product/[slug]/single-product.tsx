"use client";

import Image from "next/image";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Minus, Plus, ShoppingBag, ShoppingCart } from "lucide-react";
import { urlFor } from "@/sanity/lib/image";
import { formatBDT } from "@/lib/price";
import { Product } from "../../../../../sanity.types";
import Container from "@/components/utils/Container";
import ProductDescription from "@/components/PortableText";
import AddToCartButton from "@/components/cart/AddToCartBtn";

interface Props {
  product: Product;
}

export default function SingleProduct({ product }: Props) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState(
    product.colorVariants?.[0]?.color || ""
  );
  const [selectedSize, setSelectedSize] = useState(
    product.sizeVariants?.[0]?.sizeLabel || ""
  );
  const [selectedInches, setSelectedInches] = useState(
    product.sizeInchesVariants?.[0]?.sizeInches?.toString() || ""
  );

  console.log(selectedColor);

  const mainImage = product.images?.[selectedImage]
    ? urlFor(product.images[selectedImage]).url()
    : "";

  return (
    <section className="py-20 top-20">
      <Container className="grid lg:grid-cols-2 gap-10">
        {/* LEFT: Product Images */}
        <div>
          <div className="border rounded-lg overflow-hidden">
            <Image
              src={mainImage}
              alt={product.name || "Product Image"}
              width={600}
              height={600}
              className="w-full object-cover"
            />
          </div>

          {/* Thumbnails */}
          <div className="flex gap-3 mt-4">
            {product.images?.map((img: any, i: number) => (
              <button
                key={i}
                onClick={() => setSelectedImage(i)}
                className={`h-20 w-20 border rounded overflow-hidden ${
                  selectedImage === i ? "ring-2 ring-primary" : ""
                }`}
              >
                <Image
                  src={urlFor(img).url()}
                  alt="thumb"
                  width={80}
                  height={80}
                  className="object-cover h-full w-full"
                />
              </button>
            ))}
          </div>
        </div>

        {/* RIGHT: Product Details */}
        <div>
          <span className="text-xs md:text-sm uppercase text-muted-foreground">
            {product.category?.name}
          </span>
          <h1 className="text-3xl font-heading font-medium mb-2">
            {product.name}
          </h1>

          {/* Price */}
          <div className="flex items-baseline gap-2 mt-3">
            <p className="text-xl font-medium text-primary">
              {formatBDT((product.discountPrice ?? product.price) || 0)}
            </p>

            {product.discountPrice && (
              <p className="line-through text-gray-400">
                {formatBDT(product.price || 0)}
              </p>
            )}
          </div>

          {/* Rating */}
          <p className="text-sm text-yellow-500 mt-2">
            ⭐ {product.rating ?? 0}/5
          </p>

          {/* Description */}
          <div className="mt-4 text-gray-700">
            <ProductDescription description={product.description} />
          </div>

          {/* Color Selector */}
          {product.colorVariants && product.colorVariants.length > 0 && (
            <div className="mt-6">
              <h3 className="font-semibold mb-2">Color</h3>
              <div className="flex gap-3 flex-wrap">
                {product.colorVariants.map((v) => (
                  <button
                    key={v._key}
                    onClick={() => setSelectedColor(v.color || "")}
                    className={`px-4 py-2 border rounded flex items-center gap-2
            ${selectedColor === v.color ? "bg-primary text-white" : "hover:bg-accent"}`}
                  >
                    {/* Color dot */}
                    <span
                      className="w-4 h-4 rounded-full border"
                      style={{
                        backgroundColor:
                          v.color === "Black"
                            ? "#000"
                            : v.color === "White"
                              ? "#fff"
                              : v.color === "Red"
                                ? "#ff0000"
                                : v.color === "Blue"
                                  ? "#0066ff"
                                  : v.color === "Green"
                                    ? "#28a745"
                                    : v.color === "Yellow"
                                      ? "#ffcc00"
                                      : v.color === "Grey"
                                        ? "#777"
                                        : v.color === "Pink"
                                          ? "#ff66aa"
                                          : "#ccc",
                      }}
                    />
                    {v.color}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Clothing Size Selector */}
          {product.sizeVariants && product.sizeVariants.length > 0 && (
            <div className="mt-6">
              <h3 className="font-semibold mb-2">Size</h3>
              <div className="flex gap-2 flex-wrap">
                {product.sizeVariants.map((v) => (
                  <button
                    key={v._key}
                    onClick={() => setSelectedSize(v.sizeLabel || "")}
                    className={`px-3 py-1 border rounded
            ${selectedSize === v.sizeLabel ? "bg-primary text-white" : "hover:bg-accent"}`}
                  >
                    {v.sizeLabel}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Inches-Based Size Selector */}
          {product.sizeInchesVariants &&
            product.sizeInchesVariants.length > 0 && (
              <div className="mt-6">
                <h3 className="font-semibold mb-2">Size (Inches)</h3>
                <div className="flex gap-2 flex-wrap">
                  {product.sizeInchesVariants.map((v) => (
                    <button
                      key={v._key}
                      onClick={() =>
                        setSelectedInches(v.sizeInches?.toString() || "")
                      }
                      className={`px-3 py-1 border rounded
            ${selectedSize === `${v.sizeInches}"` ? "bg-primary text-white" : "hover:bg-accent"}`}
                    >
                      {v.sizeInches}"
                    </button>
                  ))}
                </div>
              </div>
            )}

          {/* Quantity Selector */}
          <div className="mt-6 flex items-center gap-3">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            >
              <Minus />
            </Button>

            <span className="text-lg font-semibold">{quantity}</span>

            <Button
              variant="outline"
              size="icon"
              onClick={() => setQuantity((q) => q + 1)}
            >
              <Plus />
            </Button>
          </div>

          {/* Buttons */}
          <div className="mt-8 flex gap-4">
            <AddToCartButton
              product={product}
              size="lg"
              variant="default"
              className="w-full"
            >
              Add To Cart <ShoppingBag />
            </AddToCartButton>
          </div>
        </div>
      </Container>
    </section>
  );
}
