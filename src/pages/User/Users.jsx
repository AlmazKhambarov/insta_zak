import React, { useEffect, useState } from "react";
import user_img from "../../assets/images/user_img.png";
import "./Users.scss";
import { auth, firestore } from "../../api/firebase";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
const Users = () => {
  const [user, setUser] = useState("");
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);
  const [filtred, setFiltred] = useState([
    { id: 1, name: "Sebastian" },
    { id: 1, name: "bartra" },
    { id: 1, name: "Leanardo" },
    { id: 1, name: "Keppa" },
    { id: 1, name: "Jack" },
  ]);
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
