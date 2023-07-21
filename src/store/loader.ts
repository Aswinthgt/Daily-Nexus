import { createSlice } from "@reduxjs/toolkit";


export const loader = createSlice({
    name: 'loader',
    initialState: { loader: false },
    reducers: {
        loader(state, action) {
            state = action.payload;
            return state;
        }
    }
})

export default loader.actions