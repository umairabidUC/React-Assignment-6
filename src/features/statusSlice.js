// src/redux/statusSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../api/axiosInstance';

// Async Thunks for fetching data and updating status
export const fetchTopics = createAsyncThunk('status/fetchTopics', async () => {
  const response = await axiosInstance.get('/topics');
  console.log(response.data)
  return response.data;
});

export const updateTopicStatus = createAsyncThunk('status/updateTopicStatus', async ({ id, status }) => {
  const response = await axiosInstance.patch(`/topics/${id}`, { status });
  return response.data;
});

const statusSlice = createSlice({
  name: 'status',
  initialState: {
    mode: 'show',
    selectedRows: [],
    topics: [],
    status: 'idle',
    error: null,
  },
  reducers: {
    toggleMode: (state) => {
      state.mode = state.mode === 'show' ? 'hide' : 'show';
    },
    setSelectedRows: (state, action) => {
      state.selectedRows = action.payload;
    },
    updateStatus: (state, action) => {
      const { id, status } = action.payload;
      const existingTopic = state.topics.find((topic) => topic.id === id);
      if (existingTopic) {
        existingTopic.status = status;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTopics.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchTopics.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.topics = action.payload;
      })
      .addCase(fetchTopics.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(updateTopicStatus.fulfilled, (state, action) => {
        const { id, status } = action.payload;
        const existingTopic = state.topics.find((topic) => topic.id === id);
        if (existingTopic) {
          existingTopic.status = status;
        }
      });
  },
});

export const { toggleMode, setSelectedRows, updateStatus } = statusSlice.actions;

export default statusSlice.reducer;
