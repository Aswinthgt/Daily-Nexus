import { configureStore } from "@reduxjs/toolkit";
import { loader } from "@/store/loader";
import { sideBar } from "./sidebar";


const store = configureStore({
    reducer: { load: loader.reducer , sideBar:sideBar.reducer}
})


export default store;