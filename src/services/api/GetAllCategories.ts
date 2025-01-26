import axios, { HttpStatusCode } from "axios";
import { CategoryInfoType } from "../../utils/constants";
import { apiUrls } from "../apiUrls/apiUrls";

export const GetAllCategories = async () => {
  try {
    const { status, data } = await axios.get(apiUrls.categories);
    if (status === HttpStatusCode.Ok) {
      return (
        [
          {
            id: 0,
            name: "All",
            image: "",
          },
          ...data,
        ] as CategoryInfoType[]
      )?.slice(0, 6);
    }
  } catch (error) {
    console.log(error);
    return [] as CategoryInfoType[];
  }
};
