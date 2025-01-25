import axios, { HttpStatusCode } from "axios";
import { userInfoType } from "../../utils/constants";
import { apiUrls } from "../apiUrls/apiUrls";

type ParamsType = {
  userId: number;
  body: userInfoType;
}

export const PutUserByUserId = async ({userId, body}: ParamsType) => {
  try {
    const { status, data } = await axios.put(`${apiUrls.users}/${userId}`, body);
    if (status === HttpStatusCode.Ok) {
      return (data as userInfoType);
    }
  } catch (error) {
    console.log(error);
    return {} as userInfoType;
  }
};