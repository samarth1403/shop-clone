import axios, { HttpStatusCode } from "axios";
import { apiUrls } from "../apiUrls/apiUrls";
import { CategoryInfoType } from "../../utils/constants";

export const GetAllCategories = async () => {
  try {
    const { status, data } = await axios.get(apiUrls.categories);
    if (status === HttpStatusCode.Ok) {
      return (data as CategoryInfoType[])?.slice(0, 5);
    }
  } catch (error) {
    console.log(error);
    return [] as CategoryInfoType[];
  }
};
