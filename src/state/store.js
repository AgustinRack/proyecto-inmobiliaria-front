import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./user/userSlice";
import { propertiesReducer } from "./properties";
import { selectedPropertyReducer } from "./property";
import { favoritesReducer } from "./favorites";

const store = configureStore({
  reducer: {
    user: userReducer,
    properties: propertiesReducer,
    selectedProperty: selectedPropertyReducer,
    favorites: favoritesReducer,
  },
});

export default store;
