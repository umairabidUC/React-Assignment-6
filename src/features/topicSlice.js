// src/features/topicsSlice.js
import { createSlice } from '@reduxjs/toolkit';

const topicsSlice = createSlice({
  name: 'topics',
  initialState: {
    topics: [],
    mode: 'show',
    selectedRows: [],
  },
  reducers: {
    setTopics(state, action) {
      state.topics = action.payload;
    },
    addTopic(state, action) {
      state.topics.push(action.payload);
    },
    updateStatus(state, action) {
      const { id, status } = action.payload;
      const topic = state.topics.find(topic => topic.id === id);
      if (topic) {
        topic.status = status;
      }
    },
    setSelectedRows(state, action) {
      state.selectedRows = action.payload;
    },
    toggleMode(state) {
      state.mode = state.mode === 'show' ? 'hide' : 'show';
    },
  },
});

export const { setTopics, addTopic, updateStatus, setSelectedRows, toggleMode } = topicsSlice.actions;
export default topicsSlice.reducer;
