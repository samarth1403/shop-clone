import axios, { HttpStatusCode } from "axios";
import { userInfoType } from "../../utils/constants";
import { apiUrls } from "../apiUrls/apiUrls";

type ParamsType = {
  userId: number;
}

export const GetUserByUserId = async ({userId}: ParamsType) => {
  try {
    const { status, data } = await axios.get(`${apiUrls.users}/${userId}`);
    if (status === HttpStatusCode.Ok) {
      return (data as userInfoType);
    }
  } catch (error) {
    console.log(error);
    return {} as userInfoType;
  }
};
