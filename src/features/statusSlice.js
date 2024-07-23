// src/redux/statusSlice.js
import { createSlice } from '@reduxjs/toolkit';

const statusSlice = createSlice({
  name: 'status',
  initialState: {
    selectedRows: [],
  },
  reducers: {
    selectRow: (state, action) => {
      state.selectedRows.push(action.payload)
    },
    unSelectRow: (state, action) => {
      state.selectedRows = state.selectedRows.filter((row) => row.id == action.payload.id)
    }
  },

});

export const { selectRow, unSelectRow } = statusSlice.actions;

export default statusSlice.reducer;
