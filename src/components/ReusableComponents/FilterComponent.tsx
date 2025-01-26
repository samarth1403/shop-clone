import { useState } from "react";
import { GrFilter } from "react-icons/gr";
import { PriceFiltersType } from "../../utils/constants";

type FilterComponentProps = {
  priceFilter: "lowToHigh" | "highToLow" | "none";

  setPriceFilter: (
    key: keyof PriceFiltersType,
    value: PriceFiltersType["priceFilter"]
  ) => void;
  minPrice: number;
  setMinPrice: (
    key: keyof PriceFiltersType,
    value: PriceFiltersType["minPrice"]
  ) => void;
  maxPrice: number;
  setMaxPrice: (
    key: keyof PriceFiltersType,
    value: PriceFiltersType["maxPrice"]
  ) => void;
  applyFilters: () => void;
};

const FilterComponent = ({
  maxPrice,
  minPrice,
  priceFilter,
  setMaxPrice,
  setMinPrice,
  setPriceFilter,
  applyFilters,
}: FilterComponentProps) => {
  const [openFilter, setOpenFilter] = useState<boolean>(false);

  const handleClear = () => {
    setOpenFilter(false);
    setPriceFilter("priceFilter", "none");
    setMinPrice("minPrice", 0);
    setMaxPrice("maxPrice", 0);
  };

  return (
    <div className="relative flex flex-row gap-2 ">
      <div
        onMouseEnter={() => setOpenFilter(true)}
        onClick={() => setOpenFilter(!openFilter)}
        onMouseLeave={() => setOpenFilter(false)}
        className="bg-gray-200 p-3 rounded-lg cursor-pointer  hover:shadow-lg hover:bg-gray-300 duration-500"
      >
        <GrFilter size={24} className=" text-gray-700" />
      </div>
      <div
        onMouseEnter={() => setOpenFilter(true)}
        className="absolute top-full -left-50 lg:left-0 p-1 w-full"
      >
        {openFilter && (
          <div
            onMouseLeave={() => setOpenFilter(false)}
            className="flex-start absolute top-full left-0  z-10 w-60  bg-white p-4 shadow-2xl shadow-shades-6
                      rounded-lg border border-shades-4 duration-500
                      flex flex-start flex-col gap-4
                      "
          >
            <h1 className="text-lg font-medium">Filters</h1>
            <ul>
              <li className="flex flex-col gap-4 flex-start">
                <label htmlFor="price">1. Price</label>
                <div className="flex flex-col justify-start items-start gap-3 pl-4">
                  <div className="flex flex-row flex-center gap-2">
                    <input
                      type="checkbox"
                      name="lowToHigh"
                      checked={priceFilter === "lowToHigh"}
                      onChange={(e) =>
                        setPriceFilter(
                          "priceFilter",
                          e?.target?.checked ? "lowToHigh" : "none"
                        )
                      }
                      className="cursor-pointer "
                    />
                    <label htmlFor="lowToHigh" className="text-[15px]">
                      Low to High
                    </label>
                  </div>
                  <div className="flex flex-row flex-center gap-2">
                    <input
                      type="checkbox"
                      name="highToLow"
                      checked={priceFilter === "highToLow"}
                      onChange={(e) =>
                        setPriceFilter(
                          "priceFilter",
                          e?.target?.checked ? "highToLow" : "none"
                        )
                      }
                      className="cursor-pointer "
                    />
                    <label htmlFor="highToLow" className="text-[15px]">
                      High to Low
                    </label>
                  </div>
                  <div className="flex flex-row flex-center gap-2">
                    <label htmlFor="minPrice" className="text-[15px]">
                      Min
                    </label>
                    <input
                      type="number"
                      value={minPrice || ""}
                      onChange={(e) =>
                        setMinPrice("minPrice", Number(e.target.value))
                      }
                      className="w-20 focus:outline-none border border-shades-4 rounded-lg p-2 text-[13px] "
                    />
                  </div>
                  <div className="flex flex-row flex-center gap-2">
                    <label htmlFor="maxPrice" className="text-[15px]">
                      Max
                    </label>
                    <input
                      type="number"
                      value={maxPrice || ""}
                      onChange={(e) =>
                        setMaxPrice("maxPrice", Number(e.target.value))
                      }
                      className="w-20 focus:outline-none border border-shades-4 rounded-lg p-2 text-[13px]"
                    />
                  </div>
                </div>
              </li>
            </ul>
            <div className="flex flex-row justify-between items-center gap-2 w-full">
              <button
                className="bg-white-500 text-black p-2 rounded-lg
               border border-shades-4  text-[14px] cursor-pointer
              "
                onClick={handleClear}
              >
                Clear
              </button>
              <button
                className="bg-blue-500 text-white p-2 rounded-lg text-[14px]
               cursor-pointer
              "
                onClick={applyFilters}
              >
                Apply
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FilterComponent;
