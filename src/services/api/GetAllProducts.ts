import axios, { HttpStatusCode } from "axios";
import { ProductInfoType } from "../../utils/constants";
import { apiUrls } from "../apiUrls/apiUrls";

type ParamsType = {
  params: {
    limit?: number;
    offset?: number;
    categoryId?: number;
  };
};

export const GetAllProducts = async ({ params }: ParamsType) => {
  const queryString = new URLSearchParams();
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      queryString.append(key, value.toString());
    });
  }
  try {
    const fullUrl = queryString.toString()
      ? `${apiUrls.products}?${queryString}`
      : `${apiUrls.products}`;
    const { status, data } = await axios.get(fullUrl);
    if (status === HttpStatusCode.Ok) {
      return data as ProductInfoType[];
    }
  } catch (error) {
    console.log(error);
    return [] as ProductInfoType[];
  }
};
