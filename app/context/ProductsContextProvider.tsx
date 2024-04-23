"use client";

import React, { createContext, useContext } from "react";

type ProductsContextType = {
  data: any;
};

const ProductsContext = createContext<ProductsContextType | null>(null);

type ProductsContextProviderProps = {
  data: any;
  children: React.ReactNode;
};

const ProductsContextProvider: React.FC<ProductsContextProviderProps> = ({
  data,
  children,
}) => {
  return (
    <ProductsContext.Provider value={{ data }}>
      {children}
    </ProductsContext.Provider>
  );
};

const useProductsContext = () => {
  const context = useContext(ProductsContext);
  if (!context) {
    throw new Error(
      "useProductsContext must be used within a ProductsContextProvider"
    );
  }
  return context;
};

export { ProductsContextProvider, useProductsContext };
