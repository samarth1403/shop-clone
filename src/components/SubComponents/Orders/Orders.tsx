import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../../../context/GlobalProvider";
import { constants } from "../../../utils/constants";
import { Button, Section } from "../../ReusableComponents";

const Orders = () => {
  const { orders, user } = useGlobalContext();
  const navigate = useNavigate();
  return (
    <Section
      className="mt-12 w-full"
      crosses
      crossesOffset="lg:translate-y-[5.25rem]"
      customPaddings
      id="hero"
    >
      <div className="w-full flex justify-center items-center flex-col mt-4 lg:mt-8 gap-4">
        <h1 className="text-3xl font-bold">{`Orders of ${user?.name}`} </h1>
        <div className="w-full flex flex-col items-center justify-center">
          {orders && orders.length > 0 ? (
            orders.map((order) => (
              <div
                key={order.id}
                className="w-64 lg:w-xl flex flex-col items-start justify-start border border-gray-300 px-4 py-2 lg:px-6 my-4 bg-white rounded-lg gap-4 lg:gap-6 py-4 lg:py-6 "
              >
                <div className="w-full flex flex-row items-start justify-between flex-wrap">
                  <div className="w-full lg:w-1/2 flex flex-col flex-start gap-2 ">
                    <h1 className="text-lg font-bold">Order ID : {order.id}</h1>
                    <h1 className="text-lg font-bold">
                      Total : ${order.total.toFixed(2)}
                    </h1>
                  </div>
                  <div className="w-full lg:w-1/2 flex flex-col flex-start gap-2 ">
                    <h1 className="text-lg font-bold">
                      Status : {order.status}
                    </h1>
                    <h1 className="text-lg font-bold">
                      Date : {new Date(order.createdAt).toDateString()}
                    </h1>
                  </div>
                </div>
                <div className="w-full flex flex-col items-start justify-center rounded-xl">
                  {order.products.map((product) => (
                    <div
                      key={product.id}
                      className="w-full flex flex-start border border-gray-300 gap-4 lg:gap-8 p-4 rounded-xl"
                    >
                      <img
                        src={product.images[0]}
                        alt={product.title}
                        className="w-24 h-24 object-cover rounded-xl"
                      />
                      <div className=" flex flex-col items-start justify-center gap-4">
                        <h3 className="text-lg font-medium">
                          {product?.title}
                        </h3>
                        <p className="text-lg font-medium">
                          Price: ${product?.price?.toFixed(2)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))
          ) : (
            <div className="w-full flex flex-col items-center justify-center gap-4">
              <h1 className="text-lg font-bold">No Orders Found</h1>
              <Button onClick={() => navigate(constants.routes.home)}>
                Browse More Products
              </Button>
            </div>
          )}
        </div>
      </div>
    </Section>
  );
};

export default Orders;
