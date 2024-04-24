"use client";

import React from "react";
import { useProductsContext } from "@/app/context/ProductsContextProvider";
import { useRouter } from "next/navigation";
import Image from "next/image";
import ReactStars from "react-stars";
import Link from "next/link";

const ProductsGrid: React.FC = () => {
  const router = useRouter();
  const { data } = useProductsContext();

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 2xl:grid-cols-4 gap-4 text-black px-10 md:px-0">
      {data?.map((product: any) => (
        <div
          onClick={() => router.push(`/payment`)}
          key={product.id}
          className="border rounded-lg overflow-hidden shadow-md transition duration-300 ease-in-out transform hover:scale-105 cursor-pointer"
        >
          <Image
            src={product.thumbnail}
            width={500}
            height={500}
            alt={product.name}
            className="w-full h-48 object-cover"
          />
          <div className="p-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold mb-2">
                {product.title.length > 15
                  ? product.title.slice(0, 20) + "..."
                  : product.title}
              </h3>
              <p className="text-sm font-semibold">Price: ${product.price}</p>
            </div>
            <p className="text-sm text-gray-600 mb-2">
              {product.description.length > 30
                ? product.description.slice(0, 30) + "..."
                : product.description}
            </p>
            <div className="flex justify-between items-center mb-2">
              <ReactStars
                count={5}
                value={product.rating}
                edit={false}
                size={24}
                color2={"#ffd700"}
              />
            </div>
            <button className="bg-blue-500 text-white py-2 px-4 rounded-lg transition duration-300 ease-in-out hover:bg-blue-600">
              <Link href={`/payment`}>Buy Now</Link>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductsGrid;
