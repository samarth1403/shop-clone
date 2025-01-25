import { useNavigate } from "react-router-dom";
import { Button, Section } from "../../ReusableComponents";
import { constants } from "../../../utils/constants";

const OrderPlaced = () => {
  const navigate = useNavigate();
  return (
    <Section
      className="mt-12 w-full"
      crosses
      crossesOffset="lg:translate-y-[5.25rem]"
      customPaddings
      id="hero"
    >
      <div className="flex flex-col items-center justify-center mt-4 lg:mt-8">
        <h1 className="text-4xl font-bold text-center text-green-800">
          Order Placed Successfully
        </h1>
        <p className="text-lg text-center mt-4">
          Thank you for shopping with us !!!
        </p>
        <div className="w-full flex flex-row justify-center flex-wrap items-center mt-8 gap-4">
          <Button onClick={() => navigate(constants.routes.home)}>
            Browse More Products
          </Button>
          <Button onClick={() => navigate(constants.routes.orders)}>
            View Orders
          </Button>
        </div>
      </div>
    </Section>
  );
};

export default OrderPlaced;
