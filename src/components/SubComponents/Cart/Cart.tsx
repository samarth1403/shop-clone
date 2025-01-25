import { RiDeleteBinLine } from "react-icons/ri";
import { useGlobalContext } from "../../../context/GlobalProvider";
import { constants } from "../../../utils/constants";
import { Button, Section } from "../../ReusableComponents";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { cart, setCart, user } = useGlobalContext();
  const navigate = useNavigate();

  const handleRemoveProduct = (productId: number) => {
    try {
      setCart((prev) => prev.filter((product) => product.id !== productId));
      localStorage.setItem(
        constants.localStorageItems.cart,
        JSON.stringify(cart.filter((product) => product.id !== productId))
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handlePlaceOrder = () => {
    try {
      const orders = localStorage.getItem(constants.localStorageItems.orders);
      if (orders) {
        localStorage.setItem(
          constants.localStorageItems?.orders,
          JSON.stringify([
            ...JSON.parse(orders),
            {
              id: JSON.parse(orders)?.length + 1,
              user,
              products: cart,
              total: cart.reduce((acc, product) => acc + product?.price, 0),
              createdAt: new Date().toISOString(),
              status: "pending",
            },
          ])
        );
      } else {
        localStorage.setItem(
          constants.localStorageItems?.orders,
          JSON.stringify([
            {
              id: 1,
              user,
              products: cart,
              total: cart.reduce((acc, product) => acc + product?.price, 0),
              createdAt: new Date().toISOString(),
              status: "pending",
            },
          ])
        );
      }
      setCart([]);
      localStorage.setItem(
        constants.localStorageItems.cart,
        JSON.stringify([])
      );
      toast.success("Order Placed Successfully");
      navigate(constants.routes.orderPlaced);
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
      {cart?.length === 0 ? (
        <div className="w-full flex flex-col items-center justify-center mt-4 lg:mt-8 gap-4">
          <h1 className="text-lg font-bold">Your Card is Empty</h1>
          <Button onClick={() => navigate(constants.routes.home)}>
            Browse Products
          </Button>
        </div>
      ) : (
        <div className="flex flex-row justify-center flex-wrap items-start w-full gap-4 lg:gap-8 mt-8">
          <div className="flex flex-col w-full lg:w-1/2 gap-4">
            {cart.map((product, index) => (
              <div
                key={index}
                className="flex flex-row w-full gap-4 p-4 bg-white rounded-xl shadow-md"
              >
                <img
                  src={product.images[0]}
                  className="w-24 h-24 object-contain rounded-lg"
                />
                <div className="flex flex-col gap-4 w-full">
                  <h1 className=" text-[17px] ">{product.title}</h1>
                  <div className="flex flex-row justify-between items-center w-full ">
                    <h1 className="text-[18px]">{`$ ${product.price}`}</h1>
                    <button
                      className=" text-red-500 rounded-md px-4 py-2 cursor-pointer"
                      onClick={() => handleRemoveProduct(product?.id)}
                    >
                      <RiDeleteBinLine size={20} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="flex flex-col justify-center items-start w-full lg:w-1/3 gap-4">
            <div className="flex flex-col flex-start w-full gap-4 p-4 bg-white rounded-xl shadow-md">
              <h1 className=" text-[17px] font-bold ">{`Delivering to ${user.name} , `}</h1>
              <div className="flex flex-row justify-between items-center gap-4 w-full">
                <h1 className=" text-[17px] ">Sub-Total</h1>
                <h1 className=" text-[17px] ">
                  {`$ ${cart.reduce(
                    (acc, product) => acc + product?.price,
                    0
                  )}`}
                </h1>
              </div>
              <div className="flex flex-row justify-between items-center gap-4 w-full">
                <h1 className=" text-[17px] ">Delivery Fees</h1>
                <h1 className=" text-[17px] ">{`$ 10`}</h1>
              </div>
              <div className="flex flex-row justify-center items-center gap-4 w-full">
                <h1 className="text-center">
                  -----------------------------------------
                </h1>
              </div>
              <div className="flex flex-row justify-between items-center gap-4 w-full mb-2">
                <h1 className=" text-[17px] ">Total</h1>
                <h1 className=" text-[17px] ">
                  {`$ ${
                    cart.reduce((acc, product) => acc + product?.price, 0) + 10
                  }`}
                </h1>
              </div>
              <Button className="w-full" onClick={handlePlaceOrder}>
                Proceed to Checkout
              </Button>
            </div>
          </div>
        </div>
      )}
    </Section>
  );
};

export default Cart;
