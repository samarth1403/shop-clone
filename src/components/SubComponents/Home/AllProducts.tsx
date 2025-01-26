import { useQuery } from "@tanstack/react-query";
import React, { useEffect } from "react";
import { GetAllProducts } from "../../../services/api/GetAllProducts";
import { constants, ProductInfoType } from "../../../utils/constants";
import SearchComponent from "../../ReusableComponents/SearchComponent";
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
  const [allProducts, setAllProducts] = React.useState<ProductInfoType[]>([]);
  const [masterAllProducts, setMasterAllProducts] = React.useState<
    ProductInfoType[]
  >([]);

  const { data, isLoading } = useQuery({
    queryKey: [constants.queryKeys.getAllProducts, activeCategory],
    queryFn: () => GetAllProducts({ params: { categoryId: activeCategory } }),
  });

  useEffect(() => {
    if (data) {
      setAllProducts(data);
      setMasterAllProducts(data);
    }
  }, [data]);

  return (
    <>
      <SearchComponent
        filterFields={(product: ProductInfoType) =>
          [
            product?.title,
            product?.description,
            product?.category,
            product?.price?.toString(),
            product?.id?.toString(),
          ] as string[]
        }
        masterState={masterAllProducts}
        setState={setAllProducts}
        className="w-full"
      />
      <div className="w-full flex flex-row justify-center items-center flex-wrap mt-8 xl:mt-12">
        {isLoading ? (
          <div className="medium-loader" />
        ) : (
          <div className="flex justify-center items-start flex-row flex-wrap gap-6 lg:gap-12">
            {allProducts?.map((product, index) => (
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
    </>
  );
};

export default AllProducts;
