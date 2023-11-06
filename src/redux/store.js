import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./reducer/userReducer.js";
import { productReducer } from "./reducer/productReducer.js";

const store = configureStore({
  reducer: {
    user: userReducer,
    product: productReducer,
  },
});

export default store;

export const server = "https://filpkartbackend.onrender.com/api/v1";
