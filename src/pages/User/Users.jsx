import React, { useEffect, useState } from "react";
import user_img from "../../assets/images/user_img.png";
import "./Users.scss";
import { auth, firestore } from "../../api/firebase";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
const Users = () => {
  const [user, setUser] = useState("");
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);
  const [filtred, setFiltred] = useState([]);
  auth.onAuthStateChanged((user) => {
    setUser(user);
  });
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
  useEffect(() => {
    const articleRef = collection(firestore, "Articles");
    const q = query(articleRef, orderBy("createdAt", "desc"));
    onSnapshot(q, (snapshot) => {
      const articles = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPosts(articles);
      // console.log(articles);
    });
  }, []);

  useEffect(() => {
    var arr = [];
    posts.forEach((u) => {
      var usr = users?.find((el) => el.id === u.userId);
      console.log(usr);
      arr.push({
        uid: user?.uid,
        image:
          "data:image/png;base64,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",
        name: usr?.name,
      });
    });
    setFiltred(arr);
  }, [users]);
  // console.log(posts);
  console.log(filtred);

  return (
    <div className="main_users">
      <div className="user_card">
        <img src={user?.photoURL} alt="" className="user_card_img" />
        <span>{user?.displayName}</span>
      </div>
      <div>
        {filtred?.map((el) => (
          <div className="user">
            <img src={el.image} alt="" />
            <span>{el.name}</span>
            <button>follow</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Users;
