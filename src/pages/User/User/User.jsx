/** @format */

import React, { useEffect, useState } from "react";
import "../UserProfile/UserProfile.scss";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./User.scss"
// import { getUserPost } from "../../comonents/redux/extraReducer";
import {
  arrayRemove,
  arrayUnion,
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
  updateDoc,
} from "firebase/firestore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLeftLong } from "@fortawesome/free-solid-svg-icons";
import { auth, firestore } from "../../../api/firebase";
import { getUserPost } from "../../../redux/reduxToolkit/extraReducer";
const User = ({ user }) => {
  const {  userPost } = useSelector((state) => state.post);
 var isL = false
  const navigate = useNavigate();
  const [userSetting, setUserSetting] = useState(false);
  const [users, setUsers] = useState([]);
  var params = useParams();
  //  console
  useEffect(() => {
    const userRef = collection(firestore, "users");
    const q = query(userRef, orderBy("userPhoto", "asc"));
    onSnapshot(q, (snapshot) => {
      const usersR = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setUsers(usersR);
    });
  }, [params]);
  const res = users?.find((x) => x.id == params.id);
  console.log(userPost);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUserPost(res?.userId));
  }, [res]);
  const followsRef = doc(firestore, "users", params.id);
//   console.log(followsRef);
  const handleLike = () => {
    if (res?.followers?.includes(user.uid)) {
      updateDoc(followsRef, {
        followers: arrayRemove(user.uid),
      })
        .then(() => {
          console.log("unliked");
        })
        .catch((e) => {
        //   alert(e);
          console.log(e);
        });
    } else {
      updateDoc(followsRef, {
        followers: arrayUnion(user.uid),
      })
        .then(() => {})
        .catch((e) => {
          // this is funtion
          console.log(e);
        });
    }
  };
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
                <span style={{fontSize:"30px", cursor:"pointer", }} onClick={()=>navigate(-1)}>
                  <FontAwesomeIcon  icon={faLeftLong}/>
                </span>
                <div class='profile'>
                  <div class='profile-image'>
                    <img src={res?.userPhoto} alt='' />
                  </div>
                  <div class='prof-us-prof-settings'>
                    <h1 class='prof-us-prof-name'>{res?.name}</h1>
                    <span onClick={handleLike} className="followers">
                      {!res?.followers?.includes(user?.uid)
                        ? "follow"
                        : "unfollow"}
                    </span>
                    {/* this is profile navbar */}
                  </div>

                  <div class='profile-stats'>
                    <ul>
                      <li>
                        <span class='profile-stat-count'>{userPost?.length}</span> posts
                      </li>
                      <li>
                        <span class='profile-stat-count'>{res?.followers.length}</span> followers
                      </li>
                      <li>
                        <span class='profile-stat-count'>0</span> following
                      </li>
                    </ul>
                  </div>
                  {/* this is profile navbar */}

                  <div class='profile-bio'>
                    <p>
                      <span class='profile-real-name'>{res?.userName}</span>{" "}
                      {/* this is profile navbar */}
                      {}//bio 
                    </p>
                  </div>
                </div>
              </div>
            </header>
            {/* this is profile navbar */}

            <main>
              <div class='container'>
                <div class='gallery'>
                  {userPost?.map((el) => (
                    <div class='gallery-item'>
                      <div className='img__container'>
                        <img src={el.imageUrl} class='gallery-image' alt='' />
                      </div>

                      <div class='gallery-item-info'>
                        <ul>
                          <li class='gallery-item-likes'>
                            <span class='visually-hidden'>Likes:</span>
                            {/* this is profile navbar */}
                            <i class='fas fa-heart' aria-hidden='true'></i> 34
                          </li>
                          <li class='gallery-item-comments'>
                            <span class='visually-hidden'>Comments:</span>
                            <i class='fas fa-comment' aria-hidden='true'></i> 1
                          </li>
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </main>
          </div>
          {/* {userSetting ? (
            <ModalItem
              userPhoto={user?.photoURL}
              user={user}
              userName={user?.displayName}
              setUserSetting={setUserSetting}
            />
          ) : null} */}
        </>
      )}
    </>
  );
};

export default User;
