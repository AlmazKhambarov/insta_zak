import { configureStore } from "@reduxjs/toolkit";
import loginSlice from "./loginSlice/loginSlice";
import postSlice from "./postSlice/postSlice";

const store = configureStore({
    reducer: {
        login: loginSlice,
        post:postSlice
    }
})
export default store;