
import { initializeApp } from "firebase/app";
import { getAuth, updateProfile } from "firebase/auth";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAM5aXo6d6jqc1dsF7wea73sKSyRsl9FM4",
    authDomain: "insta-new-8d332.firebaseapp.com",
    projectId: "insta-new-8d332",
    storageBucket: "insta-new-8d332.appspot.com",
    messagingSenderId: "153830614361",
    appId: "1:153830614361:web:e6c28f5b336d53cbc09848",
    measurementId: "G-VKTNSPYM42"
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