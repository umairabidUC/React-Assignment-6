// redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import statusReducer from '../features/statusSlice';
import topicsReducer from '../features/topicSlice'
export const store = configureStore({
  reducer: {
    status: statusReducer,
    topics: topicsReducer,
  },
});
