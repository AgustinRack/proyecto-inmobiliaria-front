import { createAction, createReducer } from "@reduxjs/toolkit";

export const setFavorites = createAction("SET_FAVORITES");

const initialState = [];

export const favoritesReducer = createReducer(initialState, {
  [setFavorites]: (state, action) => action.payload,
});
