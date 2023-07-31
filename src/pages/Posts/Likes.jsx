import { fireEvent } from "@testing-library/react";
import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";
import React, { useState } from "react";
import { auth, firestore } from "../../api/firebase";
import { onAuthStateChanged } from "firebase/auth";

const Likes = ({ id, likes }) => {
  const [user, setUser] = useState();
  auth.onAuthStateChanged((user) => {
    setUser(user);
  });
  // console.log(likes);
  const likesRef = doc(firestore, "Articles", id);
  // console.log(id);
  const handleLike = () => {
    if (likes?.includes(user.uid)) {
      updateDoc(likesRef, {
        likes: arrayRemove(user.uid),
      })
        .then(() => {
          console.log("unliked");
        })
        .catch((e) => {
          console.log(e);
        });
    } else {
      updateDoc(likesRef, {
        likes: arrayUnion(user.uid),
      })
        .then(() => {
          // console.log("liked");
        })
        .catch((e) => {
          console.log(e);
        });
    }
  };
  // console.log(likes);
  return (
    <div>
      <i
        className={`fa fa-heart${
          !likes?.includes(user?.uid) ? "-o" : ""
        } fa-lg`}
        style={{
          cursor: "pointer",
          color: likes?.includes(user?.uid) ? "red" : null,
        }}
        onClick={handleLike}
      />

      <span style={{marginLeft:'10px'}}>{likes?.length}</span>
    </div>
  );
};

export default Likes;
