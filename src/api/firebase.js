
import { initializeApp } from "firebase/app";
import { getAuth, updateProfile } from "firebase/auth";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyB-mKOhJStCifbeBpruwn3O_2Z7NcQYiT0",
    authDomain: "instagram-asilbek.firebaseapp.com",
    projectId: "instagram-asilbek",
    storageBucket: "instagram-asilbek.appspot.com",
    messagingSenderId: "211430707127",
    appId: "1:211430707127:web:f0c480752781cd7df6e232",
    measurementId: "G-V6HH3JYL1E"
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