// redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import statusReducer from '../features/statusSlice';
import topicsReducer from '../features/topicSlice';
import viewReducer from '../features/viewSlice'
import rowsReducer from '../features/rowsSlice'
import { rowApiSlice } from '../features/api/apiSlice';
export const store = configureStore({
  reducer: {
    status: statusReducer,
    topics: topicsReducer,
    view: viewReducer,
    rows: rowsReducer,
    [rowApiSlice.reducerPath]: rowApiSlice.reducer
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(rowApiSlice.middleware),
});
  