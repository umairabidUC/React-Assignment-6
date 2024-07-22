import { createSlice } from "@reduxjs/toolkit";



export const viewSlice = createSlice({
    name: "view",
    initialState: {
        mode: "show"
    },
    reducers: {
        toggleView: (state) => {
            state.mode = state.mode === 'show' ? 'hide' : 'show';
        },
    }
})

export const {toggleView} = viewSlice.actions
export default viewSlice.reducer