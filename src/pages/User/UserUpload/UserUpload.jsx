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
import {
  postToFirestore,
  publishPosts,
} from "../../../redux/reduxToolkit/extraReducer";
import { Timestamp, addDoc, collection } from "firebase/firestore";

const UserUpload = ({ user }) => {
  const { uploading, imageUrl, error, loadingUpload } = useSelector(
    (state) => state.post
  );
  const { progress } = useSelector((state) => state.post);

  const [data, setData] = useState({
    title: "",
    imageUpload: "",
    user: user,
  });

  const [selectedFile, setSelectedFile] = useState(null);
  const [imageUpload, setImageUpload] = useState(null);
  const [inputChange, setInputChange] = useState(false);
  const [title, setTitle] = useState("");

  const handleFileChange = (event) => {
    setData((prev) => ({ ...prev, imageUpload: event.target.files[0] }));
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      setSelectedFile(e.target.result);
    };

    reader.readAsDataURL(file);
  };

  useEffect(() => {
    if (selectedFile) {
      setInputChange(true);
    }
  }, [selectedFile, selectedFile]);
  console.log(imageUpload);
  const dispatch = useDispatch();

  const publishPost = () => {
    if (data.title != null) {
      console.log(data.imageUpload);
      dispatch(publishPosts(data));
    }
  };
  return (
    <>
      {loadingUpload ? (
        <span>Loading...</span>
      ) : (
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
                    onChange={(e) =>
                      setData((prev) => ({ ...prev, title: e.target.value }))
                    }
                  />
                </div>
                <button className="upload__done_btn" onClick={publishPost}>
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
      )}
    </>
  );
};

export default UserUpload;
