import React from "react";
import toast from "react-hot-toast";
import { BsCartCheck } from "react-icons/bs";
import { GrCart } from "react-icons/gr";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../../../context/GlobalProvider";
import {
  constants,
  GlobalContextType,
  ProductInfoType,
} from "../../../utils/constants";

interface ProductProps {
  product: ProductInfoType;
  activeProduct: number;
  setActiveProduct: React.Dispatch<React.SetStateAction<number>>;
}

const ProductCard = ({ product }: ProductProps) => {
  const navigate = useNavigate();
  const { cart, setCart, isUserLoggedIn }: GlobalContextType =
    useGlobalContext();

  const handleProductAdd = () => {
    if (!isUserLoggedIn) {
      navigate(constants.routes.login);
      return;
    }
    try {
      setCart((prev) => [...prev, product]);
      localStorage.setItem(
        constants.localStorageItems.cart,
        JSON.stringify([...cart, product])
      );
      toast.success("Product added to cart");
    } catch (error) {
      console.log(error);
    }
  };

  const isProductInCart = cart?.find((item) => item?.id === product?.id);

  return (
    <div className=" flex flex-center flex-col gap-2  w-72 lg:w-62 bg-white rounded-xl p-3 shadow-md">
      <div
        className="flex w-full flex-col flex-center cursor-pointer"
        onClick={() => {
          navigate(`${constants.routes.products}/${product?.id}`);
        }}
      >
        <div className="relative w-full group overflow-hidden rounded-xl ">
          <img
            src={product?.images[0]}
            className={` w-full object-contain
              ${product?.id % 2 === 0 ? "hover:rotate-0" : "hover:-rotate-0"} 
            transition-opacity duration-1100 ease-in-out group-hover:opacity-0 `}
            loading="lazy"
          />
          <img
            src={product?.images[1]}
            className={`absolute inset-0 w-full  object-contain ${
              product?.id % 2 === 0 ? "hover:rotate-0" : "hover:-rotate-0"
            } transition-opacity duration-1100 ease-in-out opacity-0 group-hover:opacity-100 `}
            loading="lazy"
          />
        </div>
        <div className="relative flex flex-center flex-col gap-2 pb-2 p-4">
          <h1 className={` text-left`}>{product?.title}</h1>
        </div>
      </div>

      <div className="flex justify-between w-full flex-row items-center gap-2 p-4">
        <span className="text-left h5 font-bold">{`$ ${product?.price}`}</span>
        <div
          className={`flex flex-center py-3 px-4 rounded-md ${
            isProductInCart ? "bg-green-500" : "bg-gray-600"
          }  cursor-pointer transition-all duration-300 ease-in-out `}
          onClick={!isProductInCart ? handleProductAdd : () => {}}
        >
          {isProductInCart ? (
            <BsCartCheck color="white" size={22} className="font-bold" />
          ) : (
            <GrCart color="white" size={18} className="font-bold" />
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
