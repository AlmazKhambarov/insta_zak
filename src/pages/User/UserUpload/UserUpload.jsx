import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { uploadImage } from "../../../redux/postSlice/postSlice";
import "./UserUpload.scss";
import { getDownloadURL, listAll, ref, uploadBytes } from "firebase/storage";
import { storage } from "../../../api/firebase";
import { v4 } from "uuid";
import { useNavigate } from "react-router-dom";

const UserUpload = ({user}) => {
  const { uploading, imageUrl, error } = useSelector((state) => state.post);
  const [selectedFile, setSelectedFile] = useState(null);
  const [imageUrls, setImageUrls] = useState([]);
  const [imageUpload, setImageUpload] = useState(null);
  const dispatch = useDispatch();
  const [inputChange, setInputChange] = useState(false);
  const imagesListRef = ref(storage, "images/");
  const navigate = useNavigate()
  const handleFileChange = (event) => {
    setImageUpload(event.target.files[0]);
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      setSelectedFile(e.target.result);
    };

    reader.readAsDataURL(file);
  };
  const uploadFile = () => {
    if (imageUpload == null) return;
    const imageRef = ref(storage, `images/${imageUpload.name + v4()}`);
    uploadBytes(imageRef, imageUpload).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        setImageUrls((prev) => [...prev, url]);
      });
    });
    setTimeout(()=>{
      navigate('/home/user')
    }, 1000)
  };

  useEffect(() => {
    listAll(imagesListRef).then((response) => {
      response.items.forEach((item) => {
        getDownloadURL(item).then((url) => {
          setImageUrls((prev) => [...prev, url]);
        });
      });
    });
  }, []);
  console.log(user);
  useEffect(() => {
    if (selectedFile) {
      setInputChange(true);
    }
  }, [selectedFile, selectedFile]);
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
              <img src={selectedFile ? selectedFile : null} alt="" className="image" />
            </div>
            <button className="upload__done_btn" onClick={uploadFile}>
              Upload
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserUpload;
