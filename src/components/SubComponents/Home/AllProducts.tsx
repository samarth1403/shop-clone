import { useQuery } from "@tanstack/react-query";
import React, { useEffect } from "react";
import { GetAllProducts } from "../../../services/api/GetAllProducts";
import {
  constants,
  PriceFiltersType,
  ProductInfoType,
} from "../../../utils/constants";
import FilterComponent from "../../ReusableComponents/FilterComponent";
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
  const [productFilters, setProductFilters] = React.useState<PriceFiltersType>({
    minPrice: 0,
    maxPrice: 0,
    priceFilter: "none",
  });
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

  const handleFilter = () => {
    let filteredProducts = [...masterAllProducts];
    if (productFilters?.priceFilter !== "none") {
      filteredProducts = filteredProducts?.sort((a, b) => {
        if (productFilters.priceFilter === "lowToHigh") {
          return a?.price - b?.price;
        } else {
          return b?.price - a?.price;
        }
      });
    } else {
      setAllProducts(() => [...masterAllProducts]);
    }
    if (productFilters.minPrice) {
      filteredProducts = filteredProducts.filter(
        (product) => product.price >= productFilters.minPrice
      );
    }
    if (productFilters.maxPrice) {
      filteredProducts = filteredProducts.filter(
        (product) => product.price <= productFilters.maxPrice
      );
    }
    setAllProducts(() => [...filteredProducts]);
  };

  return (
    <>
      <div className="w-full flex flex-row justify-center items-center flex-wrap gap-4">
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
        <FilterComponent
          applyFilters={handleFilter}
          maxPrice={productFilters?.maxPrice}
          minPrice={productFilters?.minPrice}
          priceFilter={productFilters?.priceFilter}
          setMaxPrice={(key, value) =>
            setProductFilters((prev) => ({ ...prev, [key]: value }))
          }
          setMinPrice={(key, value) =>
            setProductFilters((prev) => ({ ...prev, [key]: value }))
          }
          setPriceFilter={(key, value) =>
            setProductFilters((prev) => ({ ...prev, [key]: value }))
          }
        />
      </div>

      <div className="w-full flex flex-row justify-center items-center flex-wrap mt-8 xl:mt-10">
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
