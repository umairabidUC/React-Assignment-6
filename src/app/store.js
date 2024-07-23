// redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import viewReducer from '../features/viewSlice'
import { rowApiSlice } from '../features/api/apiSlice';
export const store = configureStore({
  reducer: {
    view: viewReducer,
    [rowApiSlice.reducerPath]: rowApiSlice.reducer
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(rowApiSlice.middleware),
});
