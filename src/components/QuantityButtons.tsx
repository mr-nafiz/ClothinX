import { Button } from "./ui/button";
import { Minus, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { Product } from "../../sanity.types";
import useStore from "../../store";
import { toast } from "sonner";

interface Props {
  product: Product;
  className?: string;
}
const QuantityButtons = ({ product, className }: Props) => {
  const addItem = useStore((s) => s.addItem);
  const getItemCount = useStore((s) => s.getItemCount);
  const removeItem = useStore((s) => s.removeItem);
  const itemCount = getItemCount(product?._id);
  const isOutOfStock = product?.stock === 0;
  const stock = Number(product?.stock ?? 0); // default unlimited

  const handleRemoveProduct = () => {
    removeItem(product?._id);
    if (itemCount > 1) {
      toast.success("Quantity Decreased successfully!");
    } else {
      toast.success(`${product?.name?.substring(0, 12)} removed successfully!`);
    }
  };

  const handleAddToCart = () => {
    if (itemCount >= stock) {
      toast.error("No more stock available");
      return;
    } else {
      addItem(product);
      toast.success(`${product.name?.slice(0, 12)} added to cart`);
    }
  };

  return (
    <div className={cn("flex items-center gap-1 pb-1 text-base", className)}>
      <Button
        onClick={handleRemoveProduct}
        variant="outline"
        size="icon"
        disabled={itemCount === 0 || isOutOfStock}
        className="w-6 h-6 border hover:bg-shop_dark_green/20 hoverEffect"
      >
        <Minus />
      </Button>
      <span className="font-semibold text-sm w-6 text-center text-darkColor">
        {itemCount}
      </span>
      <Button
        onClick={handleAddToCart}
        variant="outline"
        size="icon"
        disabled={isOutOfStock}
        className="w-6 h-6 border hover:bg-shop_dark_green/20 hoverEffect"
      >
        <Plus />
      </Button>
    </div>
  );
};

export default QuantityButtons;
