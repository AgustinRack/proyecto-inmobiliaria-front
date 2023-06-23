import { createAction, createReducer } from "@reduxjs/toolkit";

export const setUserName = createAction("SET_USER_NAME");

const initialState = "";

export const userNameReducer = createReducer(initialState, {
  [setUserName]: (state, action) => action.payload,
});
