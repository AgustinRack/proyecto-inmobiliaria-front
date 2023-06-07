import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./user/userSlice";
import { propertiesReducer } from "./properties";
import { selectedPropertyReducer } from "./property";

const store = configureStore({
  reducer: {
    user: userReducer,
    properties: propertiesReducer,
    selectedProperty: selectedPropertyReducer,
  },
});

// store.subscribe(() => {
//   localStorage.setItem("cart", JSON.stringify(store.getState().cart));
// });

export default store;
