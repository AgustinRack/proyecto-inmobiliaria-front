import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  userData: null,
  admin: false,
  users: [],
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.isAuthenticated = true;
      state.userData = action.payload;
      state.admin = action.payload.admin;
    },
    logoutSuccess: (state) => {
      state.isAuthenticated = false;
      state.userData = null;
      state.admin = false;
    },
    list: (state, action) => {
      state.users = action.payload;
    },
  },
});

export const { loginSuccess, logoutSuccess, list } = userSlice.actions;
export default userSlice.reducer;
