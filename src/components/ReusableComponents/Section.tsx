import PlusSvg from "../../utils/assets/svg/PlusSvg";
import React, { ReactNode } from "react";

const Section = ({
  className,
  id,
  crosses,
  crossesOffset,
  children,
  childrenClassName,
  customPaddings,
}: {
  className: string;
  crosses: boolean;
  id: string;
  crossesOffset: string;
  children: ReactNode;
  customPaddings: boolean;
  childrenClassName?: string;
}) => {
  return (
    <section className={className}>
      <div className="flex">
        <div className="ml-1.5 h-auto w-px bg-shades-4" />
        <div
          className={`mb-4 flex-1 px-4 lg:mb-8 lg:px-8 ${childrenClassName}`}
        >
          {children}
        </div>
        <div className="mr-1.5 h-auto w-px bg-shades-4" />
      </div>
      <div className="flex items-center">
        <PlusSvg />
        <div className=" h-px w-full bg-shades-4" />
        <PlusSvg />
      </div>
    </section>
  );
};

export default Section;
