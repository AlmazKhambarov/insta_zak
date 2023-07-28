import React, { useEffect, useState } from "react";
import "./UserProfile.scss";
import user from "../../../assets/images/user_img.png";
import SettingsIcon from "@mui/icons-material/Settings";
import { Link } from "react-router-dom";
import { storage } from "../../../api/firebase";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  listAll,
  list,
} from "firebase/storage";
const UserProfile = () => {
  const [imageUrls, setImageUrls] = useState([]);
  useEffect(() => {
    const imagesListRef = ref(storage, "images/");

    listAll(imagesListRef).then((response) => {
      response.items.forEach((item) => {
        getDownloadURL(item).then((url) => {
          setImageUrls((prev) => [...prev, url]);
        });
      });
    });
  }, []);
console.log(imageUrls)
  const userName = localStorage.getItem("username");
  return (
    <div className="profile">
      <div className="profile_card">
        <div>
          <img src={user} alt="" className="profile_card_image" />
        </div>
        <div>
          <div className="username_card">
            <h1>{userName}</h1>
            <div className="username_card_content">
              <Link to={"/home/setting"}>
                <button>edit</button>
              </Link>
              <Link to={"/home/setting"}>
                <SettingsIcon />
              </Link>
            </div>
          </div>
          <div className="follow">
            <div>
              <span>{imageUrls.length}</span>
              <p>publication</p>
            </div>
            <div>
              <span>0</span>
              <p> subscribers</p>
            </div>
            <div>
              <span>0</span>
              <p>subscriptions</p>
            </div>
          </div>
        </div>
      </div>

      <div className="posts_card">
        <h4>posts</h4>
        <hr />
        <div className="posts_card_images">
          {imageUrls?.map((img)=>(
            <img src={img} alt='#' className="posts_image"/>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
