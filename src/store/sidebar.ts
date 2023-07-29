import { createSlice } from "@reduxjs/toolkit";

export const sideBar = createSlice({
    name: "sideBar",
    initialState: { value: false },
    reducers: {
        openSideBar(state: any) {
            state = !state
            return state;
        }
    }
});

export default sideBar.actions