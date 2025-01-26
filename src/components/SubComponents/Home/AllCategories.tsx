import { useQuery } from "@tanstack/react-query";
import { GetAllCategories } from "../../../services/api/GetAllCategories";
import { CategoryInfoType, constants } from "../../../utils/constants";

//Swiper Imports
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

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
    <div className="flex-center mt-4 w-full flex-col lg:mt-4 xl:mt-6 ">
      <div className="w-full flex flex-row justify-center items-center flex-wrap">
        {isLoading ? (
          <div className="medium-loader" />
        ) : (
          <Swiper
            className={` w-[300px] md:w-[600px] lg:w-[1000px] flex items-center justify-center py-[1rem] h-auto `}
            grabCursor={true}
            loop={true}
            autoplay={{
              delay: 1500,
              disableOnInteraction: true,
            }}
            speed={1000}
            modules={[Autoplay, Pagination]}
            pagination={{
              clickable: true,
            }}
            style={
              {
                "--swiper-pagination-color": "black",
                "--swiper-pagination-bullet-size": "8px",
                "--swiper-pagination-bullet-inactive-color": "black",
                "--swiper-pagination-bullet-inactive-size": "6px",
              } as React.CSSProperties
            }
            breakpoints={{
              0: {
                slidesPerView: 2,
                slidesPerGroup: 1,
              },
              400: {
                slidesPerView: 2,
                slidesPerGroup: 1,
              },
              639: {
                slidesPerView: 2,
                slidesPerGroup: 1,
              },
              768: {
                slidesPerView: 4,
                slidesPerGroup: 1,
              },
              1024: {
                slidesPerView: 4,
                slidesPerGroup: 1,
              },
              1280: {
                slidesPerView: 4,
                slidesPerGroup: 1,
              },
              1536: {
                slidesPerView: 5,
                slidesPerGroup: 1,
              },
            }}
          >
            {data
              ?.filter((item) => item?.image?.includes("https://"))
              ?.map((category: CategoryInfoType, index: number) => (
                <SwiperSlide key={index} className="my-[2rem] xl:my-[2.5rem]">
                  <div
                    className=" flex flex-center flex-col gap-4 cursor-pointer "
                    key={category.id}
                    onClick={() => setActiveCategory(category?.id)}
                  >
                    <img
                      src={category?.image}
                      className="w-26 md:w-28 lg:w-32 object-contain rounded-full hover:shadow-2xl hover:scale-105 duration-500 shadow-shades-6  "
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
                </SwiperSlide>
              ))}
          </Swiper>
        )}
      </div>
    </div>
  );
};

export default AllCategories;
