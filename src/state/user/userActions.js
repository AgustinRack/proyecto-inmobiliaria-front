import axios from "axios";
import { loginSuccess, logoutSuccess, list } from "./userSlice";
import * as settings from "../../settings";
axios.defaults.withCredentials = true;

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
      alert("usuario registrado con exito");
    } catch (error) {
      console.error("Register error:", error);
    }
  };

export const loginUser = (email, password) => async (dispatch) => {
  try {
    const response = await axios.post(`${settings.axiosURL}/users/login`, {
      email,
      password,
    });

    alert(response.data);
    const payload = await axios.get(`${settings.axiosURL}/users/secret`);

    const userData = payload.data;
    await dispatch(loginSuccess(userData));
  } catch (error) {
    console.error("Login error:", error);
  }
};

export const logoutUser = () => async (dispatch) => {
  try {
    dispatch(logoutSuccess());
    await axios.post(`${settings.axiosURL}/users/logout`);
  } catch (error) {
    console.error("Login error:", error);
  }
};
