"use client";

import React from "react";
import { useProductsContext } from "@/app/context/ProductsContextProvider";
import { useRouter } from "next/navigation";

const ProductsGrid: React.FC = () => {
  const router = useRouter();
  const { data } = useProductsContext();

  return (
    <div className="grid grid-cols-3 gap-4">
      {data?.map((product: any) => (
        <div
          onClick={() => router.push(`/payment`)}
          key={product.id}
          className="border p-4"
        >
          <h3 className="text-lg font-semibold">{product.name}</h3>
          <p>{product.description}</p>
          <p className="text-sm mt-2">Price: ${product.price}</p>
        </div>
      ))}
    </div>
  );
};

export default ProductsGrid;
