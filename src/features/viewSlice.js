import { createSlice } from "@reduxjs/toolkit";


export const viewSlice = createSlice({
    name: "view",
    initialState: {
        mode: "show",
        selectedRows: [],
    },
    reducers: {
        toggleView: (state) => {
            state.mode = state.mode === 'show' ? 'hide' : 'show';
        },
        selectRow: (state, action) => {
            state.selectedRows.push(action.payload)
        },
        unSelectRow: (state, action) => {
            state.selectedRows = state.selectedRows.filter((row) => row.id == action.payload.id)
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
        }
    }
})

export const { toggleView, selectRow, unSelectRow, toggleStatus, clearSelectedRows } = viewSlice.actions
export default viewSlice.reducer