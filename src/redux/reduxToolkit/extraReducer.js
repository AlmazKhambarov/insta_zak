import { createAsyncThunk, createReducer } from '@reduxjs/toolkit'
import { auth, firestore, storage } from '../../api/firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { useDispatch } from 'react-redux';
import { Timestamp, addDoc, collection, doc, setDoc } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { setProgress } from '../loginSlice/loginSlice';
// export const signUpUser = createAsyncThunk(
//   'auth/signUpUser',
//   async (data, thunkAPI) => {
//     const { displayName, email, password } = data
//     console.log(password)
//     try {
//       const userCredential = await createUserWithEmailAndPassword(
//         email,
//         password
//       );
//       const user = userCredential.user;
//       await user.updateProfile({
//         displayName: displayName,
//       });

//       return { email: user.email, uid: user.uid, displayName: user.displayName };
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error.message);
//     }
//   }
// );
export const postToFirestore = createAsyncThunk(
  'posts/postToFirestore',
  async (postData, thunkAPI) => {
    try {
      // Assuming you have a collection named "posts"
      const postsRef = firestore.collection('posts');
      // Add the new post data to Firestore
      const docRef = await postsRef.add(postData);
      // Return the ID of the new post document
      return docRef.id;
    } catch (error) {
      // Handle error if necessary
      console.error('Error posting data:', error);
      throw error;
    }
  }
);
export const createUserAndProfileAsync = createAsyncThunk(
  "user/createUserAndProfile",
  async (data, thunkAPI) => {
    const { email, password, userName } = data
    try {
      const user = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(auth.currentUser, { displayName: userName });
      const articleRef = collection(firestore, "users");
      addDoc(articleRef, {
        email: email,
        name: userName,
        id: auth.currentUser.uid,
        followers: 0,
        follow: 0
      })
      return user;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
)


export const getUser = createAsyncThunk('get/only/user', async () => {
  try {
    const user = auth.onAuthStateChanged((u) => {
      return u
    })
    console.log(user)
  } catch (e) {
    console.log(e)
  }
})



export const publishPosts = createAsyncThunk(
  'posts/publish',
  async (data, thunkAPI) => {
    const { title, imageUpload, user } = data;
    try {
      const storageRef = ref(
        storage,
        `/images/${Date.now()}${imageUpload?.name}`
      );

      const uploadImage = uploadBytesResumable(storageRef, imageUpload);

      uploadImage.on(
        'state_changed',
        (snapshot) => {
          const progressPercent = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          thunkAPI.dispatch(setProgress(progressPercent));
        },
        (err) => {
          console.log(err);
        }
      );

      // Await the uploadImage to complete
      await uploadImage;

      const url = await getDownloadURL(uploadImage.snapshot.ref);

      const articleData = {
        title: title,
        description: 'description',
        imageUrl: url,
        createdAt: Timestamp.now().toDate(),
        createdBy: user?.displayName,
        userId: user?.uid,
        likes: [],
        comments: [],
      };

      const articleRef = collection(firestore, 'Articles');
      await addDoc(articleRef, articleData);

      thunkAPI.dispatch(setProgress(0));

      return {}; // You can return data if needed
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
