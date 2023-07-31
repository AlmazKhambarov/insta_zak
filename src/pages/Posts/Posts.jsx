import React, { useEffect, useState } from "react";
import "./Posts.scss";
import user_img from "../../assets/images/user_img.png";
import ModeCommentIcon from "@mui/icons-material/ModeComment";
import Users from "../User/Users";
import { ref } from "firebase/storage";
import { firestore, storage } from "../../api/firebase";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../../redux/reduxToolkit/extraReducer";
import "bootstrap/dist/css/bootstrap.min.css";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import Likes from "./Likes";
import Saved from "./Saved";
import { useNavigate } from "react-router-dom";
import { postsUpload } from "../../redux/postSlice/postSlice";
const Posts = () => {
  const [article, setArticles] = useState(null);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.login);
  const navigate = useNavigate();
  useEffect(() => {
    getUser();
  }, []);

  useEffect(() => {
    const articleRef = collection(firestore, "Articles");
    const q = query(articleRef, orderBy("createdAt", "desc"));
    onSnapshot(q, (snapshot) => {
      const articles = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setArticles(articles);
    });
  }, []);
  console.log(article);
  return (
    <>
      <div className="posts">
        <div className="navbar">
          <input type="search" className="navbar_search" placeholder="Search" />
        </div>
        <div className="post_card">
          {article?.map((el) => (
            <div className="card">
              <div className="card_user">
                <img src={user_img} alt="" />
                <span>Author:{el.createdBy}</span>
              </div>
              <div className="card_post">
                <img src={el.imageUrl} alt="" className="card_post_img" />
              </div>
              <div className="card__title">
                <span>
                  <p>{el.createdBy}:</p>
                  {el.title}
                </span>
              </div>
              <div className="card_items">
                <Likes id={el.id} likes={el.likes} user={user} />
                <span
                  onClick={() =>
                    navigate(`/home/comment/${el.id}`) ||
                    dispatch(postsUpload(el))
                  }
                >
                  <ModeCommentIcon sx={{ fontSize: "30px" }} />
                </span>
                <Saved />
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
