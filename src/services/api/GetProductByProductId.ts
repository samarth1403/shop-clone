import axios, { HttpStatusCode } from "axios";
import { ProductInfoType } from "../../utils/constants";
import { apiUrls } from "../apiUrls/apiUrls";

export const GetProductByProductId = async ({ id }: { id: number }) => {
  try {
    const { status, data } = await axios.get(`${apiUrls.products}/${id}`);
    if (status === HttpStatusCode.Ok) {
      return data as ProductInfoType;
    }
  } catch (error) {
    console.log(error);
    return {} as ProductInfoType;
  }
};
