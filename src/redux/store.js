import { configureStore } from '@reduxjs/toolkit';
import { sidebarSlice } from './slice';
import { api } from './apiSlices/api';
import { invoicesApiSlice } from './apiSlices/invoiceApi';

const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    [invoicesApiSlice.reducerPath]: invoicesApiSlice.reducer,  // Add invoices API slice
    sidebar: sidebarSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware).concat(invoicesApiSlice.middleware),
});

export default store;
