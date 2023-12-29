/** @format */

import { createSlice } from "@reduxjs/toolkit";
import { storage } from "../../api/firebase";
import { fetchUsersAsync, getUserPost, publishPosts } from "../reduxToolkit/extraReducer";

const postSlice = createSlice({
  name: "post",
  initialState: {
    uploading: false,
    imageUrl: null,
    error: null,
    articles: [],
    loadingUpload: false,
    loading: null,
    otherUsers: [],
    userPost:[]
  },
  reducers: {
    startUpload: (state) => {
      state.uploading = true;
      state.error = null;
    },
    uploadSuccess: (state, action) => {
      state.uploading = false;
      state.imageUrl = action.payload;
    },
    uploadFailure: (state, action) => {
      state.uploading = false;
      state.error = action.payload;
    },
    postsUpload: (state, action) => {
      state.articles = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(publishPosts.pending, (state, action) => {
        state.loadingUpload = true;
      })
      .addCase(publishPosts.fulfilled, (state, action) => {
        state.loadingUpload = false;
      })
      .addCase(publishPosts.rejected, (state, action) => {});
    builder
      .addCase(fetchUsersAsync.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchUsersAsync.fulfilled, (state, action) => {
        state.otherUsers = action.payload;
      })
      .addCase(fetchUsersAsync.rejected, (state, action) => {});
    builder
      .addCase(getUserPost.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getUserPost.fulfilled, (state, action) => {
        state.userPost = action.payload;
      })
      .addCase(getUserPost.rejected, (state, action) => {});
  },
});

export const { startUpload, uploadSuccess, uploadFailure, postsUpload } =
  postSlice.actions;

export const uploadImage = (file) => async (dispatch) => {
  dispatch(startUpload());

  try {
    const storageRef = storage();
    const imageRef = storageRef.child(`images/${file.name}`);
    const snapshot = await imageRef.put(file);
    const imageUrl = await snapshot.ref.getDownloadURL();

    dispatch(uploadSuccess(imageUrl));
  } catch (error) {
    dispatch(uploadFailure(error.message));
  }
};

export default postSlice.reducer;
