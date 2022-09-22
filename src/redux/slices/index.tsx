import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "..";

const initialState = {
    time: '24h',
    value: ''
}

const selectSlice = createSlice({
    name: 'select',
    initialState,
    reducers: {
    }
})


export const selectReducer = selectSlice.reducer;
export const selectSliceActions = selectSlice.actions;

