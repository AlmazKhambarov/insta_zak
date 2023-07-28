import { createSlice } from '@reduxjs/toolkit';
import { storage } from '../../api/firebase';


const postSlice = createSlice({
  name: 'post',
  initialState: {
    uploading: false,
    imageUrl: null,
    error: null,
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
  },
});

export const { startUpload, uploadSuccess, uploadFailure } = postSlice.actions;

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
