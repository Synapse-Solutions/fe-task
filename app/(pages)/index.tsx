import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { ProductsContextProvider } from "@/app/context/ProductsContextProvider";
import ProductsGrid from "@/app/components/ProductsGrid";

const IndexPage: React.FC = () => {
  const [pageSize, setPageSize] = useState(20);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsArray, setProductsArray] = useState<any>([]);
  const { data, isLoading, refetch } = useQuery(
    ["products", currentPage],
    async () => {
      const response = await fetch(
        `https://dummyjson.com/products?limit=${pageSize}&skip=${
          (currentPage - 1) * pageSize
        }`
      );
      return response.json();
    }
  );

  const handleSeeMore = () => {
    setCurrentPage((prev) => prev + 1);
    refetch();
  };

  useEffect(() => {
    if (data?.products) {
      setProductsArray((prev: any) => [...prev, ...data.products]);
    }
  }, [data]);

  return (
    <ProductsContextProvider data={productsArray}>
      <div className="container mx-auto text-black">
        <h1 className="text-3xl font-bold my-8">Products</h1>
        {isLoading && productsArray.length === 0 ? (
          <div className="h-screen w-full flex items-center justify-center">
            <p className="text-[40px] font-bold">Loading...</p>
          </div>
        ) : (
          <>
            <ProductsGrid />

            <button
              onClick={handleSeeMore}
              className="bg-blue-500 text-white py-2 px-4 mt-4"
            >
              See More
            </button>
          </>
        )}
      </div>
    </ProductsContextProvider>
  );
};

export default IndexPage;
