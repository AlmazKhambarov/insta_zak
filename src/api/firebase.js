
import { initializeApp } from "firebase/app";
import { getAuth, updateProfile } from "firebase/auth";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDSiKC4TmODihSnkn-qfasdUCBofbi32aI",
    authDomain: "my-org-insta.firebaseapp.com",
    projectId: "my-org-insta",
    storageBucket: "my-org-insta.appspot.com",
    messagingSenderId: "392813907946",
    appId: "1:392813907946:web:a89b73edf5a54f1f842c93",
    measurementId: "G-E7NJEQ8ZL1"
};

export async function upload(file, currentUser, setLoading) {
    console.log(currentUser)
    const fileRef = ref(storage, currentUser?.uid + '.png');

    setLoading(true);

    const snapshot = await uploadBytes(fileRef, file)
    const photoURL = await getDownloadURL(fileRef)

    updateProfile(currentUser, { photoURL })

    setLoading(false);
    alert("Uploaded file!");
}
// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const firestore = getFirestore(app);