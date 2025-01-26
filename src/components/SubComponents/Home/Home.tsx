import { useState } from "react";
import { Section } from "../../ReusableComponents";
import AllCategories from "./AllCategories";
import AllProducts from "./AllProducts";

const Home = () => {
  const [activeCategory, setActiveCategory] = useState<number>(0);
  const [activeProduct, setActiveProduct] = useState<number>(0);
  return (
    <Section
      className="mt-6 w-full"
      crosses
      crossesOffset="lg:translate-y-[5.25rem]"
      customPaddings
      id="hero"
    >
      <AllCategories
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
      />
      <AllProducts
        activeProduct={activeProduct}
        setActiveProduct={setActiveProduct}
        activeCategory={activeCategory}
      />
    </Section>
  );
};

export default Home;
