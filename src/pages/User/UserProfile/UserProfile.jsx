/** @format */

import React, { useEffect, useState } from "react";
import "./UserProfile.scss";
// import user from "../../../assets/images/user_img.png";
import SettingsIcon from "@mui/icons-material/Settings";
import { Link } from "react-router-dom";
import { firestore, storage } from "../../../api/firebase";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import UserEdit from "./UserEdit";

const UserProfile = ({ user }) => {
  const [imageUrls, setImageUrls] = useState([]);
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);

  const [filtred, setFiltred] = useState([]);
  const [userSetting, setUserSetting] = useState(false)
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
  useEffect(() => {
    const articleRef = collection(firestore, "users");
    const q = query(articleRef, orderBy("email"));
    onSnapshot(q, (snapshot) => {
      const post = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setUsers(post);
    });
  }, []);
  // console.log(posts);
  useEffect(() => {
    var arr = [];
    var res = posts?.find((el) => el.userId === user?.uid);
    if (res) {
      // console.log(res);
      setFiltred((prev) => [...prev, res]);
    }
  }, [posts]);
  const handleClickConfirm =()=>{

  }
  console.log(filtred);

  const currentUser = users?.find(x=>x.id==user?.uid)

  const userName = localStorage.getItem("username");
  var isL = false
  return (
    <>
      {isL ? (
        <h2>Loading...</h2>
      ) : (
        <>
          <div className='userprofile'>
            <header>
              {/* this is profile navbar */}
              <div class='containeres'>
                <div class='profile'>
                  <div class='profile-image'>
                    <img src={currentUser?.userPhoto} alt='' />
                  </div>
                  {/* this is profile navbar */}

                  <div class='prof-us-prof-settings'>
                    <h1 class='prof-us-prof-name'>{user?.displayName}</h1>

                    <button
                      class=' profile-edit-btn'
                      onClick={() => setUserSetting(!userSetting)}>
                      Edit Profile
                      <SettingsIcon/>
                    </button>

                    {/* this is profile navbar */}
                  </div>

                  <div class='profile-stats'>
                    <ul>
                      <li>
                        <span class='profile-stat-count'>
                          {filtred?.length}
                        </span>{" "}
                        posts
                      </li>
                      <li>
                        <span class='profile-stat-count'>
                          {currentUser?.followers.length}
                        </span>{" "}
                        followers
                      </li>
                      <li>
                        <span class='profile-stat-count'>0</span> following
                      </li>
                    </ul>
                  </div>
                  {/* this is profile navbar */}

                  <div class='profile-bio'>
                    <p>
                      <span class='profile-real-name'>
                        {user?.displayName}:
                      </span>{" "}
                      {currentUser?.userBio}
                      📷✈️🏕️
                    </p>
                  </div>
                </div>
              </div>
            </header>
            {/* this is profile navbar */}

            <main>
              <div class='container'>
                <div class='gallery'>
                  {filtred?.map((el) => (
                    <div class='gallery-item'>
                      <div className='img__container'>
                        <img src={el.imageUrl} class='gallery-image' alt='' />
                      </div>
                      <FontAwesomeIcon
                        icon={faTrash}
                        className='trash__icon'
                        onClick={() => handleClickConfirm(el.name, el.id)}
                      />

                      <div class='galler'></div>
                    </div>
                  ))}
                </div>
              </div>
            </main>
          </div>
          {userSetting ? (
            <UserEdit
            user={user}
             userSetting={userSetting}
              setUserSetting={setUserSetting}
            />
          ) : null}
        </>
      )}
    </>
  );
};

export default UserProfile;
