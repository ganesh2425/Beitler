import axios from "axios";
import { BASE_URL } from "../constants/actionTypes";

type loginState = {
  login_id: "";
  password: "";
};
export const getAuthDetails = (payload: loginState): any => {
  try {
    return axios({
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      url: BASE_URL + "/Auth/login",
      data: { userName: payload.login_id, password: payload.password },
    });
  } catch (error) {
    throw error;
  }
};
