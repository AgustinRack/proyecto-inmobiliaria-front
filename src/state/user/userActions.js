import axios from "axios";
axios.defaults.withCredentials = true;
import { login, logout, register, list } from "./userSlice";
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
      dispatch(register(userData));
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
    console.log("PAYLOAD: ", payload.data);

    const userData = payload.data;
    await dispatch(login(userData));
  } catch (error) {
    console.error("Login error:", error);
  }
};

export const logoutUser = () => async (dispatch) => {
  try {
    await axios.post(`${settings.axiosURL}/users/logout`);
    dispatch(logout());
  } catch (error) {
    console.error("Login error:", error);
  }
};

export const fetchUsers = () => async (dispatch) => {
  try {
    const response = await axios.get(`${settings.axiosURL}/admin/users`);
    dispatch(list(response.data));
  } catch (error) {
    console.error("Fetch error:", error);
  }
};
