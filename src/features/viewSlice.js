import { createSlice } from "@reduxjs/toolkit";
import { act } from "react";


export const viewSlice = createSlice({
    name: "view",
    initialState: {
        mode: "show",
        selectedRows: [],
        visibleRows: 0,
        hiddenRows: 0,
        masterChecked: false,
        byPassMaster: false,
        masterClicked: false,
    },
    reducers: {
        toggleView: (state) => {
            state.mode = state.mode === 'show' ? 'hide' : 'show';
        },
        selectRow: (state, action) => {
            state.selectedRows.push(action.payload)
        },
        unSelectRow: (state, action) => {
            state.selectedRows = state.selectedRows.filter(row => row.Id != action.payload.id)
        },
        toggleStatus: (state, action) => {
            state.selectedRows.forEach((row) => {
                if (action.payload.id == row.Id) {

                    row.Status = !row.Status
                }
            })
        },
        clearSelectedRows: (state) => {
            state.selectedRows = []
        },
        updateVisibleRows: (state, action) => {
            state.visibleRows = action.payload
        },
        updateHiddenRows: (state, action) => {
            state.hiddenRows = action.payload
        },
        setMaster: (state,action) => {
            state.masterChecked = action.payload
        },
        setByPassMaster: (state, action)=> {
            state.byPassMaster = action.payload
        },
        setMasterClicked: (state,action) => {
            state.masterClicked = action.payload
        }
    }
})

export const { toggleView, selectRow, unSelectRow, toggleStatus, clearSelectedRows, updateVisibleRows, updateHiddenRows, setMaster, setByPassMaster, setMasterClicked } = viewSlice.actions
export default viewSlice.reducer