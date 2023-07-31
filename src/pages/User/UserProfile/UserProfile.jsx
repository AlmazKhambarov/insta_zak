import React, { useEffect, useState } from "react";
import "./UserProfile.scss";
// import user from "../../../assets/images/user_img.png";
import SettingsIcon from "@mui/icons-material/Settings";
import { Link } from "react-router-dom";
import { firestore, storage } from "../../../api/firebase";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";

const UserProfile = ({ user }) => {
  const [imageUrls, setImageUrls] = useState([]);
  const [posts, setPosts] = useState([]);
  const [filtred, setFiltred] = useState([]);
  useEffect(() => {
    const articleRef = collection(firestore, "Articles");
    const q = query(articleRef, orderBy("createdAt", "desc"));
    onSnapshot(q, (snapshot) => {
      const post = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPosts(post);
    });
  }, []);
  console.log(posts);
  useEffect(() => {
    var arr = [];
    var res = posts?.find((el) => el.userId === user?.uid);
    if (res) {
      // console.log(res);
      setFiltred((prev) => [...prev, res]);
    }
  }, [posts]);
  console.log(filtred);
  const userName = localStorage.getItem("username");
  return (
    <div className="profile">
      <div className="profile_card">
        <div>
          <img src={user} alt="" className="profile_card_image" />
        </div>
        <div>
          <div className="username_card">
            <h1>{user?.displayName}</h1>
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
              <span>{filtred?.length}</span>
              <p>publication</p>
            </div>
            <div>
              <span>2</span>
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
          {filtred.map((img) => (
            <img src={img.imageUrl} alt="#" className="posts_image" />
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
