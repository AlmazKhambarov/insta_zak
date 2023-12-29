/** @format */

import React, { useEffect, useState } from "react";
import user_img from "../../assets/images/user_img.png";
import "./Users.scss";
import { auth, firestore } from "../../api/firebase";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import {
  fetchUserById,
  fetchUsersAsync,
} from "../../redux/reduxToolkit/extraReducer";
import { useDispatch, useSelector } from "react-redux";
const Users = ({user}) => {
  const { otherUsers } = useSelector((state) => state.post);
  // const [user, setUser] = useState("");
  const [users, setUsers] = useState([]);
  var dispatch = useDispatch();

console.log(user)
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

  // useEffect(() => {
  //   dispatch(fetchUsersAsync());
  // }, []);
  const filtredUsers = users.filter(x=>x.userId !==user?.uid)
  const currentUser = users?.find(x=>x.userId==user?.uid)
  console.log(filtredUsers);
  return (
    <div className='main_users'>
      <div className='user_card'>
        <img src={currentUser?.userPhoto} alt='' className='user_card_img' />
        <span>{currentUser?.name}</span>
      </div>
      <div>
        {filtredUsers?.map((el) => (
          <div className='user'>
            <img src={el.userPhoto} alt='' />
            <a href={`/user/${el.id}`}>{el?.name}</a>
            {/* <button>see</button> */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Users;
