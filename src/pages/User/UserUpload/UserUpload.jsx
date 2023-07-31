import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { uploadImage } from "../../../redux/postSlice/postSlice";
import "./UserUpload.scss";
import {
  getDownloadURL,
  listAll,
  ref,
  uploadBytes,
  uploadBytesResumable,
} from "firebase/storage";
import { firestore, storage } from "../../../api/firebase";
import { v4 } from "uuid";
import { useNavigate } from "react-router-dom";
import { postToFirestore } from "../../../redux/reduxToolkit/extraReducer";
import { Timestamp, addDoc, collection } from "firebase/firestore";

const UserUpload = ({ user }) => {
  const { uploading, imageUrl, error } = useSelector((state) => state.post);
  const [selectedFile, setSelectedFile] = useState(null);
  const [imageUpload, setImageUpload] = useState(null);
  const [inputChange, setInputChange] = useState(false);
  const [title, setTitle] = useState("");

  const handleFileChange = (event) => {
    setImageUpload(event.target.files[0]);
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      setSelectedFile(e.target.result);
    };

    reader.readAsDataURL(file);
  };

  console.log(user);
  useEffect(() => {
    if (selectedFile) {
      setInputChange(true);
    }
  }, [selectedFile, selectedFile]);

  const [formData, setFormData] = useState({
    photoTitle: "",
    comment: "",
    post: "",
    createData: Timestamp.now().toDate(),
  });
  const [progress, setProgress] = useState(0);
  // console.log(imageUpload);
  const publishPosts = () => {
    // if(/)
    if (!title) {
      alert("Please fill all the fields");
      return;
    }
    const storageRef = ref(
      storage,
      `/images/${Date.now()}${imageUpload?.name}`
    );

    const uploadImage = uploadBytesResumable(storageRef, imageUpload);
    uploadImage.on(
      "state_changed",
      (snapshot) => {
        const progressPercent = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progressPercent);
      },
      (err) => {
        console.log(err);
      },
      () => {
        setFormData({
          title: "",
          description: "",
          image: "",
        });

        getDownloadURL(uploadImage.snapshot.ref).then((url) => {
          const articleRef = collection(firestore, "Articles");
          addDoc(articleRef, {
            title: title,
            description: "descriptiom",
            imageUrl: url,
            createdAt: Timestamp.now().toDate(),
            createdBy: user?.displayName,
            userId: user?.uid,
            likes: [],
            comments: [],
          })
            .then(() => {
              setProgress(0);
              setSelectedFile("");
              setImageUpload();
              setInputChange(false);
            })
            .catch((err) => {});
        });
      }
    );
  };

  return (
    <div className="upload__main">
      <h2>Create New Post</h2>
      <div className="upload">
        {!inputChange ? (
          <form>
            <label for="images" class="drop-container" id="dropcontainer">
              <span class="drop-title">Drop files here</span>
              or
              <input
                type="file"
                id="images"
                accept="image/*"
                required
                onChange={handleFileChange}
              />
            </label>
          </form>
        ) : (
          <div>
            <div className="form_image">
              <img
                src={selectedFile ? selectedFile : null}
                alt=""
                className="image"
              />
              <input
                type="text"
                placeholder="Title.."
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <button className="upload__done_btn" onClick={publishPosts}>
              Upload
            </button>
            {progress === 0 ? null : (
              <div className="progress">
                <div
                  className="progress-bar progress-bar-striped mt-2"
                  style={{ width: `${progress}%` }}
                >
                  {`uploading image ${progress}%`}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserUpload;
