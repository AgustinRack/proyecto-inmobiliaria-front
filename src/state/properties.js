import { createAction, createReducer } from "@reduxjs/toolkit";

export const setProperties = createAction("SET_PROPERTIES");

const initialState = [];

export const propertiesReducer = createReducer(initialState, {
  [setProperties]: (state, action) => action.payload,
});
