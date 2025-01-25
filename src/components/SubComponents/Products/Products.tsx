import React, { useState } from "react";
import { Section } from "../../ReusableComponents";
import AllProducts from "../Home/AllProducts";

const Products = () => {
  const [activeCategory, setActiveCategory] = useState<number>(0);
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
        activeCategory={activeCategory}
      />
    </Section>
  );
};

export default Products;
