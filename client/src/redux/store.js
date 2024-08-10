import { configureStore } from "@reduxjs/toolkit";
import authReducers from "./slices/authSlice";

const store = configureStore({
  reducer: {
    authReducers:authReducers
  }
});

export default store;
