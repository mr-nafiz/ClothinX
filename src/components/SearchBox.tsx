"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { urlFor } from "@/sanity/lib/image";
import { getImageUrl } from "@/lib/getImageUrl";
import { Product } from "../../sanity.types";
import { formatBDT } from "@/lib/price";

export default function SearchBox() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  // Debounce effect
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (query.trim().length > 1) searchProducts();
      else setResults([]);
    }, 300);
    return () => clearTimeout(timeout);
  }, [query]);

  const searchProducts = async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/search?q=${query}`);
      const data = await res.json();
      setResults(data);
      setOpen(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative w-full">
      <div className="flex items-center border rounded-lg px-3 py-2 bg-white">
        <Search className="w-4 h-4 text-gray-500" />
        <input
          type="text"
          placeholder="Search products..."
          className="w-full outline-none px-2 text-sm"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => results.length && setOpen(true)}
        />
      </div>

      {/* Dropdown results */}
      {open && results.length > 0 && (
        <div className="absolute mt-2 w-full bg-white border rounded-lg shadow-lg z-50 max-h-80 overflow-y-auto">
          {results.map((p) => (
            <Link
              key={p._id}
              href={`/product/${p.slug?.current}`}
              className="flex items-center gap-3 p-2 border-b hover:bg-gray-50"
              onClick={() => setOpen(false)}
            >
              {p.images && p.images.length > 0 ? (
                <Image
                  src={getImageUrl(p?.images[0])}
                  alt={p.name || "Product Image"}
                  width={50}
                  height={50}
                  className="rounded object-cover aspect-square"
                />
              ) : (
                <div className="w-12 h-12 bg-gray-200 rounded flex items-center justify-center">
                  <span className="text-gray-500 text-sm">No Image</span>
                </div>
              )}

              <div className="flex flex-col">
                <span className="text-sm font-medium">{p.name}</span>
                <span className="text-xs text-gray-500">
                  {formatBDT(p.price ?? 0)}
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}

      {/* No results */}
      {open && !loading && query.length > 1 && results.length === 0 && (
        <div className="absolute mt-2 w-full bg-white border rounded-lg p-3 text-sm text-gray-500">
          No products found
        </div>
      )}
    </div>
  );
}
