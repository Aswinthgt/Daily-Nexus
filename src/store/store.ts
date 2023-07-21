import { configureStore } from "@reduxjs/toolkit";
import { loader } from "@/store/loader"


const store = configureStore({
    reducer: { load: loader.reducer }
})


export default store;