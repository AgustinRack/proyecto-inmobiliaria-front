import { createAction, createReducer } from "@reduxjs/toolkit";

export const setSelectedProperty = createAction("SET_SELECTED_PROPERTY");

const initialState = {};

export const selectedPropertyReducer = createReducer(initialState, {
  [setSelectedProperty]: (state, action) => action.payload,
});
