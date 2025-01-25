import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { BsArrowLeft, BsCartCheck } from "react-icons/bs";
import { GrCart } from "react-icons/gr";
import { useNavigate, useParams } from "react-router-dom";
import { useGlobalContext } from "../../../context/GlobalProvider";
import { GetProductByProductId } from "../../../services/api/GetProductByProductId";
import { constants, GlobalContextType } from "../../../utils/constants";
import { Button, Section } from "../../ReusableComponents";

const ProductDetails = () => {
  const navigate = useNavigate();
  const { productId } = useParams();
  const { data, isLoading } = useQuery({
    queryKey: [constants.queryKeys.getProductByCategoryId, productId],
    queryFn: () => GetProductByProductId({ id: parseInt(productId!) }),
  });

  const { cart, setCart, isUserLoggedIn }: GlobalContextType =
    useGlobalContext();

  const isProductInCart = cart?.find((item) => item?.id === data?.id);

  const handleProductAdd = () => {
    if (!isUserLoggedIn) {
      navigate(constants.routes.login);
      return;
    }
    try {
      if (data) {
        setCart((prev) => [...prev, data]);
        localStorage.setItem(
          constants.localStorageItems.cart,
          JSON.stringify([...cart, data])
        );
      }
      toast.success("Product added to cart");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Section
      className="mt-12 w-full"
      crosses
      crossesOffset="lg:translate-y-[5.25rem]"
      customPaddings
      id="hero"
    >
      <div className=" w-full flex flex-row justify-center items-center flex-wrap mt-8 xl:mt-12">
        {isLoading ? (
          <div className="medium-loader" />
        ) : (
          <div className="flex justify-center lg:justify-start items-start flex-row flex-wrap gap-4 md:gap-8 lg:gap-12">
            <img
              src={data?.images[0]}
              className={` w-64 lg:w-78 object-contain rounded-xl hover:scale-105 duration-500 `}
              loading="lazy"
            />
            <div className="w-full lg:w-1/2 flex flex-col gap-4">
              <h1 className={`h5 font-bold text-left`}>{data?.title}</h1>
              <p className={` text-left`}>{data?.description}</p>
              <span className="text-left h4 font-bold">{` $ ${data?.price}`}</span>
              <div className="w-full flex flex-row justify-center lg:justify-start flex-wrap items-center gap-4">
                <Button
                  onClick={() => navigate(constants.routes.products)}
                  className="w-56"
                  iconBefore={<BsArrowLeft className="font-bold" size={20} />}
                >
                  Go Back
                </Button>
                <div
                  className={`w-56 flex justify-center flex-row flex-wrap items-center gap-2 px-4 py-3 rounded-xl ${
                    isProductInCart ? "bg-green-500" : "bg-black cursor-pointer"
                  }`}
                  onClick={isProductInCart ? () => {} : handleProductAdd}
                >
                  {isProductInCart ? (
                    <span className="flex items-center gap-4 text-white font-bold ">
                      <BsCartCheck
                        color="white"
                        size={22}
                        className="font-bold"
                      />
                      Added to Card
                    </span>
                  ) : (
                    <span className="flex items-center gap-2 text-white font-bold ">
                      <GrCart color="white" size={18} className="font-bold" />
                      Add to Cart
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </Section>
  );
};

export default ProductDetails;
