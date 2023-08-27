import { createSlice } from '@reduxjs/toolkit';
import { storage } from '../../api/firebase';
import { publishPosts } from '../reduxToolkit/extraReducer';


const postSlice = createSlice({
  name: 'post',
  initialState: {
    uploading: false,
    imageUrl: null,
    error: null,
    articles: [],
    loadingUpload: false
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
      state.articles = action.payload
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(publishPosts.pending, (state, action) => {
        state.loadingUpload = true
      })
      .addCase(publishPosts.fulfilled, (state, action) => {
        state.loadingUpload = false
      })
      .addCase(publishPosts.rejected, (state, action) => {

      })
  }
});

export const { startUpload, uploadSuccess, uploadFailure, postsUpload } = postSlice.actions;

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
