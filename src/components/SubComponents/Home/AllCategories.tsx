import { useQuery } from "@tanstack/react-query";
import { GetAllCategories } from "../../../services/api/GetAllCategories";
import { CategoryInfoType, constants } from "../../../utils/constants";

interface AllCategoriesProps {
  activeCategory: number;
  setActiveCategory: React.Dispatch<React.SetStateAction<number>>;
}

const AllCategories = ({
  activeCategory,
  setActiveCategory,
}: AllCategoriesProps) => {
  const { data, isLoading } = useQuery({
    queryKey: [constants.queryKeys.getAllCategories],
    queryFn: GetAllCategories,
  });
  return (
    <div className="flex-center mt-4 w-full flex-col lg:mt-4 xl:mt-6">
      <div className="w-full flex flex-row justify-center items-center flex-wrap">
        {isLoading ? (
          <div className="medium-loader" />
        ) : (
          <div className="flex flex-row gap-4 lg:gap-12">
            {data
              ?.filter((item) => item?.image?.includes("https://"))
              ?.map((category: CategoryInfoType) => (
                <div
                  className=" flex flex-center flex-col gap-4 cursor-pointer w-40 "
                  key={category.id}
                  onClick={() => setActiveCategory(category?.id)}
                >
                  <img
                    src={category?.image}
                    className="w-36 object-contain rounded-full hover:shadow-2xl hover:scale-105 duration-500 shadow-shades-6  "
                  />
                  <div className="relative flex flex-center flex-col gap-2 pb-2">
                    <h1
                      className={`${
                        activeCategory === category?.id ? "h6" : "body-1"
                      }`}
                    >
                      {category?.name}
                    </h1>
                    {activeCategory === category?.id && (
                      <div className="absolute bottom-0 w-36 h-1 bg-blue-500 rounded-full duration-500 " />
                    )}
                  </div>
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AllCategories;
