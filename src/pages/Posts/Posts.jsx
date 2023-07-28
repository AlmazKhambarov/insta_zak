import React, { useEffect, useState } from "react";
import "./Posts.scss";
import user_img from "../../assets/images/user_img.png";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ModeCommentIcon from "@mui/icons-material/ModeComment";
import { datas } from "./postsData";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import Users from "../User/Users";
import { getDownloadURL, listAll, ref } from "firebase/storage";
import { storage } from "../../api/firebase";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../../redux/reduxToolkit/extraReducer";
const Posts = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.login);
  const imagesListRef = ref(storage, "images/");
  const [imageUrls, setImageUrls] = useState([]);
  useEffect(() => {
    listAll(imagesListRef).then((response) => {
      response.items.forEach((item) => {
        console.log(item);
        getDownloadURL(item).then((url) => {
          setImageUrls((prev) => [...prev, url]);
        });
      });
    });
  }, []);
  useEffect(() => {
    getUser();
  }, []);
  console.log(user);
  return (
    <>
      <div className="posts">
        <div className="navbar">
          <input type="search" className="navbar_search" placeholder="Search" />
        </div>
        <div className="post_card">
          {imageUrls?.map((el) => (
            <div className="card">
              <div className="card_user">
                <img src={user_img} alt="" />
                <span>Author:</span>
              </div>
              <div className="card_post">
                <img src={el} alt="" className="card_post_img" />
              </div>
              <div className="card_items">
                <FavoriteBorderIcon sx={{ color: "red", fontSize: "30px" }} />
                <ModeCommentIcon sx={{ fontSize: "30px" }} />
                <BookmarkBorderIcon sx={{ fontSize: "30px" }} />
              </div>
            </div>
          ))}
        </div>
      </div>
      <Users />
    </>
  );
};

export default Posts;
