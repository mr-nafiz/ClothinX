"use client";
import { Button } from "./ui/button";
import { ShoppingBag } from "lucide-react";
import Link from "next/link";
import useStore from "../../store";

const CartIcon = () => {
  const items = useStore((s) => s.items);
  return (
    <Link href="/cart">
      <Button variant={"ghost"} size={"icon"} className="relative">
        <ShoppingBag className="size-5" />
        <span className="absolute -top-1 -right-1 bg-primary text-white px-1 text-xs rounded-full">
          {items.length || 0}
        </span>
      </Button>
    </Link>
  );
};

export default CartIcon;
