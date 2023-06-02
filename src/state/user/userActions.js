import axios from "axios";
axios.defaults.withCredentials = true;
import { loginSuccess, logoutSuccess, list } from "./userSlice";
import * as settings from "../../settings";

export const registerUser =
  (name, lastName, email, password, phoneNumber) => async (dispatch) => {
    try {
      const response = await axios.post(`${settings.axiosURL}/users/signup`, {
        name,
        lastName,
        email,
        password,
        phoneNumber,
      });

      const userData = response.data;
      dispatch(loginSuccess(userData));
    } catch (error) {
      console.error("Register error:", error);
    }
  };

export const loginUser = (email, password) => async (dispatch) => {
  try {
    await axios.post(`${settings.axiosURL}/users/login`, {
      email,
      password,
    });

    const payload = await axios.get(`${settings.axiosURL}/users/secret`);

    const userData = payload.data;
    await dispatch(loginSuccess(userData));
  } catch (error) {
    console.error("Login error:", error);
  }
};

export const logoutUser = () => async (dispatch) => {
  try {
    await axios.post(`${settings.axiosURL}/users/logout`);
    dispatch(logoutSuccess());
  } catch (error) {
    console.error("Login error:", error);
  }
};
