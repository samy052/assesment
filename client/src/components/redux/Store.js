import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./Slice.js";

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});
