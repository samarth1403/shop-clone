import { RiDeleteBinLine } from "react-icons/ri";
import { useGlobalContext } from "../../../context/GlobalProvider";
import { constants } from "../../../utils/constants";
import { Section } from "../../ReusableComponents";

const Cart = () => {
  const { cart, setCart } = useGlobalContext();

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

  return (
    <Section
      className="mt-12 w-full"
      crosses
      crossesOffset="lg:translate-y-[5.25rem]"
      customPaddings
      id="hero"
    >
      <div className="flex flex-row flex-center w-full gap-4">
        <div className="flex flex-col w-1/2 gap-4">
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
                <h1 className=" text-[19px] ">{product.title}</h1>
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
      </div>
    </Section>
  );
};

export default Cart;
