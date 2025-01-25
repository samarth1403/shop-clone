import { useQuery } from "@tanstack/react-query";
import React from "react";
import { GetAllProducts } from "../../../services/api/GetAllProducts";
import { constants } from "../../../utils/constants";
import ProductCard from "./ProductCard";

interface AllProductsProps {
  activeProduct: number;
  activeCategory: number;
  setActiveProduct: React.Dispatch<React.SetStateAction<number>>;
}

const AllProducts = ({
  activeProduct,
  activeCategory,
  setActiveProduct,
}: AllProductsProps) => {
  const { data, isLoading } = useQuery({
    queryKey: [constants.queryKeys.getAllProducts, activeCategory],
    queryFn: () => GetAllProducts({ params: { categoryId: activeCategory } }),
  });

  return (
    <div className="w-full flex flex-row justify-center items-center flex-wrap mt-8 xl:mt-12">
      {isLoading ? (
        <div className="medium-loader" />
      ) : (
        <div className="flex justify-center items-start flex-row flex-wrap gap-4 lg:gap-12">
          {data?.map((product, index) => (
            <ProductCard
              product={product}
              key={index}
              activeProduct={activeProduct}
              setActiveProduct={setActiveProduct}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default AllProducts;
