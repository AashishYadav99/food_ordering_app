import { configureStore } from "@reduxjs/toolkit";
import foodReducer from "./CartSlice";

const store = configureStore({
  reducer: {
    Food: foodReducer,
  },
});

export default store;
