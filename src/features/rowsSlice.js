import { createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../api/axiosInstance";

const getRows = async () => {
    const response = await axiosInstance.get('/topics');
    return response.data
}

const initialState = [];


const rowsSlice = createSlice({
    name: "rows",
    initialState,
    reducers: {
        addRow: (state,action) => {
            console.log(state)
            return state.push(action.payload)
        },

        deleteRow: (state,action)=>{
            return state.filter((row) => row.id == action.payload.id)
        }
    }
})

export const {addRow, deleteRow} = rowsSlice.actions
export default rowsSlice.reducer

