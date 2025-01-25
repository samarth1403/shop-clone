import { useState } from "react";
import { Section } from "../../ReusableComponents";
import AllProducts from "../Home/AllProducts";

const Products = () => {
  const [activeProduct, setActiveProduct] = useState<number>(0);
  return (
    <Section
      className="mt-12 w-full"
      crosses
      crossesOffset="lg:translate-y-[5.25rem]"
      customPaddings
      id="hero"
    >
      <AllProducts
        activeProduct={activeProduct}
        setActiveProduct={setActiveProduct}
        activeCategory={0}
      />
    </Section>
  );
};

export default Products;
