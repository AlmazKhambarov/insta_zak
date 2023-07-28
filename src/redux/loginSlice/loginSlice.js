import { createSlice } from "@reduxjs/toolkit";
import { createUserAndProfileAsync, loginRequest, signUpUser, getUser } from "../reduxToolkit/extraReducer";
import { auth } from "../../api/firebase";

const initialState = {
    error: null,
    loading: false,
    user: null,
}

const loginSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(createUserAndProfileAsync.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createUserAndProfileAsync.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
            })
            .addCase(createUserAndProfileAsync.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
        builder
            .addCase(loginRequest.pending, (state) => {
                state.loading = true;
            })
            .addCase(loginRequest.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
            })
            .addCase(loginRequest.rejected, (state, action) => {
                state.loading = false;
                state.error = 'false'
            });
        builder
            .addCase(getUser.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(getUser.fulfilled, (state, action) => {
                console.log(action.payload)
            })
            .addCase(getUser.rejected, (state, action) => {

            })
    }
})

export const { } = loginSlice.actions
export default loginSlice.reducer