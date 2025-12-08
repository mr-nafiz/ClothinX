"use client";

import { useState, useMemo } from "react";
import ProductCard from "@/components/product/ProductCard";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Funnel, Minus } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Brand, Category, Product } from "../../../../sanity.types";
import { formatBDT } from "@/lib/price";
import {
  Dialog,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DialogContent } from "@radix-ui/react-dialog";

interface Props {
  products: Product[];
  categories: Category[];
  brands: Brand[];
}

export default function ShopFilters({ products, categories, brands }: Props) {
  // filter states
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
  const prices = products.map((p) => Number(p.price) || 0);
  const minPrice = Math.min(...prices);
  const maxPrice = Math.max(...prices);

  const [priceRange, setPriceRange] = useState([minPrice, maxPrice]);
  const [sortBy, setSortBy] = useState<"low" | "high" | null>(null);
  const [stockFilter, setStockFilter] = useState<"in" | "out" | null>(null);

  // filtering logic
  const filteredProducts = useMemo(() => {
    let filtered = [...products];

    if (selectedCategory) {
      filtered = filtered.filter(
        (p) => p.category?.slug?.toString() === selectedCategory
      );
    }

    if (selectedBrand) {
      filtered = filtered.filter(
        (p) => p.brand?.slug?.toString() === selectedBrand
      );
    }

    filtered = filtered.filter((p) => {
      const price = Number(p.price) || 0;
      return price >= priceRange[0] && price <= priceRange[1];
    });

    if (stockFilter === "in") {
      filtered = filtered.filter((p) => p.stock != null && p.stock > 0);
    }
    if (stockFilter === "out") {
      filtered = filtered.filter((p) => p.stock != null && p.stock === 0);
    }

    if (sortBy === "low") {
      filtered.sort((a, b) => (a.price ?? 0) - (b.price ?? 0));
    }
    if (sortBy === "high") {
      filtered.sort((a, b) => (b.price ?? 0) - (a.price ?? 0));
    }

    return filtered;
  }, [
    products,
    selectedCategory,
    selectedBrand,
    priceRange,
    sortBy,
    stockFilter,
  ]);

  console.log("Filtered Products:", filteredProducts);
  console.log("Selected Category:", categories);

  return (
    // 🔥 FIX: prevent POST /shop causing empty products
    <form
      onSubmit={(e) => e.preventDefault()}
      className="grid grid-cols-1 md:grid-cols-4 gap-6"
    >
      {/* LEFT SIDEBAR FILTERS */}
      <div className="hidden md:block p-4 border rounded-lg space-y-4 h-fit sticky top-20">
        <Accordion type="multiple" className="w-full space-y-4 no-underline ">
          {/* Categories */}
          <AccordionItem value="categories" className="border-b-0">
            <AccordionTrigger className="w-full border border-border rounded-lg px-3 py-2 hover:bg-accent">
              Categories
            </AccordionTrigger>
            <AccordionContent>
              <div className="flex flex-col gap-1 pt-2">
                {categories.map((cat) => (
                  <Button
                    type="button" // 🔥 FIX
                    variant="ghost"
                    key={cat._id}
                    onClick={() =>
                      setSelectedCategory(
                        selectedCategory === cat.slug?.toString()
                          ? null
                          : (cat.slug?.toString() ?? null)
                      )
                    }
                    className={`justify-start font-normal ${
                      selectedCategory === cat.slug?.toString()
                        ? "bg-accent"
                        : ""
                    }`}
                  >
                    {cat.name}
                  </Button>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* Brands */}
          <AccordionItem value="brands" className="border-b-0">
            <AccordionTrigger className="w-full border border-border rounded-lg px-3 py-2 hover:bg-accent">
              Brands
            </AccordionTrigger>
            <AccordionContent>
              <div className="flex flex-col gap-1 pt-2">
                {brands.map((brand) => (
                  <Button
                    type="button" // 🔥 FIX
                    variant="ghost"
                    key={brand._id}
                    onClick={() =>
                      setSelectedBrand(
                        selectedBrand === brand.slug?.toString()
                          ? null
                          : (brand.slug?.toString() ?? null)
                      )
                    }
                    className={`justify-start font-normal ${
                      selectedBrand === brand.slug?.toString()
                        ? "bg-accent"
                        : ""
                    }`}
                  >
                    {brand.name}
                  </Button>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* Price */}
          <AccordionItem value="price" className="border-b-0">
            <AccordionTrigger className="w-full border border-border rounded-lg px-3 py-2 hover:bg-accent">
              Price Range
            </AccordionTrigger>
            <AccordionContent>
              <div className="pt-4 space-y-4">
                <Slider
                  value={priceRange}
                  max={maxPrice}
                  step={10}
                  onValueChange={(value) => setPriceRange(value)}
                />

                <div className="flex flex-row justify-between items-center gap-2">
                  <Input
                    type="number"
                    value={priceRange[0]}
                    onChange={(e) =>
                      setPriceRange([Number(e.target.value), priceRange[1]])
                    }
                  />
                  <Minus className="size-8 text-muted-foreground" />
                  <Input
                    type="number"
                    value={priceRange[1]}
                    onChange={(e) =>
                      setPriceRange([priceRange[0], Number(e.target.value)])
                    }
                  />
                </div>

                <p className="text-sm mt-1">
                  {formatBDT(priceRange[0])} - {formatBDT(priceRange[1])}
                </p>
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* Stock */}
          <AccordionItem value="availability" className="border-b-0">
            <AccordionTrigger className="w-full border border-border rounded-lg px-3 py-2 hover:bg-accent">
              Availability
            </AccordionTrigger>
            <AccordionContent>
              <div className="flex flex-col gap-1 pt-2">
                <Button
                  type="button" // 🔥 FIX
                  variant="ghost"
                  onClick={() => setStockFilter("in")}
                  className={`justify-start font-normal ${
                    stockFilter === "in" ? "bg-accent" : ""
                  }`}
                >
                  In Stock
                </Button>

                <Button
                  type="button" // 🔥 FIX
                  variant="ghost"
                  onClick={() => setStockFilter("out")}
                  className={`justify-start font-normal ${
                    stockFilter === "out" ? "bg-accent" : ""
                  }`}
                >
                  Out of Stock
                </Button>
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* Sort */}
          <AccordionItem value="sort" className="border-b-0">
            <AccordionTrigger className="w-full border border-border rounded-lg px-3 py-2 hover:bg-accent">
              Sort By
            </AccordionTrigger>
            <AccordionContent>
              <div className="flex flex-col gap-1 pt-2">
                <Button
                  type="button" // 🔥 FIX
                  variant="ghost"
                  onClick={() => setSortBy("low")}
                  className={`justify-start font-normal ${
                    sortBy === "low" ? "bg-accent" : ""
                  }`}
                >
                  Price: Low to High
                </Button>

                <Button
                  type="button" // 🔥 FIX
                  variant="ghost"
                  onClick={() => setSortBy("high")}
                  className={`justify-start font-normal ${
                    sortBy === "high" ? "bg-accent" : ""
                  }`}
                >
                  Price: High to Low
                </Button>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
      <Dialog>
        <DialogTrigger asChild className="md:hidden">
          <Button variant="outline" size={"icon"} className="md:hidden ">
            <Funnel />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="mb-2">Apply Filters</DialogTitle>
          </DialogHeader>
          <div className="p-4 border rounded-lg space-y-4 h-fit sticky top-20">
            <Accordion
              type="multiple"
              className="w-full space-y-4 no-underline "
            >
              {/* Categories */}
              <AccordionItem value="categories" className="border-b-0">
                <AccordionTrigger className="w-full border border-border rounded-lg px-3 py-2 hover:bg-accent">
                  Categories
                </AccordionTrigger>
                <AccordionContent>
                  <div className="flex flex-col gap-1 pt-2">
                    {categories.map((cat) => (
                      <Button
                        type="button" // 🔥 FIX
                        variant="ghost"
                        key={cat._id}
                        onClick={() =>
                          setSelectedCategory(
                            selectedCategory === cat.slug?.toString()
                              ? null
                              : (cat.slug?.toString() ?? null)
                          )
                        }
                        className={`justify-start font-normal ${
                          selectedCategory === cat.slug?.toString()
                            ? "bg-accent"
                            : ""
                        }`}
                      >
                        {cat.name}
                      </Button>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>

              {/* Brands */}
              <AccordionItem value="brands" className="border-b-0">
                <AccordionTrigger className="w-full border border-border rounded-lg px-3 py-2 hover:bg-accent">
                  Brands
                </AccordionTrigger>
                <AccordionContent>
                  <div className="flex flex-col gap-1 pt-2">
                    {brands.map((brand) => (
                      <Button
                        type="button" // 🔥 FIX
                        variant="ghost"
                        key={brand._id}
                        onClick={() =>
                          setSelectedBrand(
                            selectedBrand === brand.slug?.toString()
                              ? null
                              : (brand.slug?.toString() ?? null)
                          )
                        }
                        className={`justify-start font-normal ${
                          selectedBrand === brand.slug?.toString()
                            ? "bg-accent"
                            : ""
                        }`}
                      >
                        {brand.name}
                      </Button>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>

              {/* Price */}
              <AccordionItem value="price" className="border-b-0">
                <AccordionTrigger className="w-full border border-border rounded-lg px-3 py-2 hover:bg-accent">
                  Price Range
                </AccordionTrigger>
                <AccordionContent>
                  <div className="pt-4 space-y-4">
                    <Slider
                      value={priceRange}
                      max={maxPrice}
                      step={10}
                      onValueChange={(value) => setPriceRange(value)}
                    />

                    <div className="flex flex-row justify-between items-center gap-2">
                      <Input
                        type="number"
                        value={priceRange[0]}
                        onChange={(e) =>
                          setPriceRange([Number(e.target.value), priceRange[1]])
                        }
                      />
                      <Minus className="size-8 text-muted-foreground" />
                      <Input
                        type="number"
                        value={priceRange[1]}
                        onChange={(e) =>
                          setPriceRange([priceRange[0], Number(e.target.value)])
                        }
                      />
                    </div>

                    <p className="text-sm mt-1">
                      {formatBDT(priceRange[0])} - {formatBDT(priceRange[1])}
                    </p>
                  </div>
                </AccordionContent>
              </AccordionItem>

              {/* Stock */}
              <AccordionItem value="availability" className="border-b-0">
                <AccordionTrigger className="w-full border border-border rounded-lg px-3 py-2 hover:bg-accent">
                  Availability
                </AccordionTrigger>
                <AccordionContent>
                  <div className="flex flex-col gap-1 pt-2">
                    <Button
                      type="button" // 🔥 FIX
                      variant="ghost"
                      onClick={() => setStockFilter("in")}
                      className={`justify-start font-normal ${
                        stockFilter === "in" ? "bg-accent" : ""
                      }`}
                    >
                      In Stock
                    </Button>

                    <Button
                      type="button" // 🔥 FIX
                      variant="ghost"
                      onClick={() => setStockFilter("out")}
                      className={`justify-start font-normal ${
                        stockFilter === "out" ? "bg-accent" : ""
                      }`}
                    >
                      Out of Stock
                    </Button>
                  </div>
                </AccordionContent>
              </AccordionItem>

              {/* Sort */}
              <AccordionItem value="sort" className="border-b-0">
                <AccordionTrigger className="w-full border border-border rounded-lg px-3 py-2 hover:bg-accent">
                  Sort By
                </AccordionTrigger>
                <AccordionContent>
                  <div className="flex flex-col gap-1 pt-2">
                    <Button
                      type="button" // 🔥 FIX
                      variant="ghost"
                      onClick={() => setSortBy("low")}
                      className={`justify-start font-normal ${
                        sortBy === "low" ? "bg-accent" : ""
                      }`}
                    >
                      Price: Low to High
                    </Button>

                    <Button
                      type="button" // 🔥 FIX
                      variant="ghost"
                      onClick={() => setSortBy("high")}
                      className={`justify-start font-normal ${
                        sortBy === "high" ? "bg-accent" : ""
                      }`}
                    >
                      Price: High to Low
                    </Button>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </DialogContent>
      </Dialog>

      {/* PRODUCT GRID */}
      <div className="md:col-span-3 grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filteredProducts.length === 0 && <p>No products found.</p>}

        {filteredProducts.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </form>
  );
}
