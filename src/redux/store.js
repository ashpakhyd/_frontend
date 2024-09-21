import { configureStore } from "@reduxjs/toolkit";
import { sidebarSlice } from "./slice";
import { api } from "./apiSlices/api"; 
const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    reducer: sidebarSlice.reducer, 
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

export default store;
