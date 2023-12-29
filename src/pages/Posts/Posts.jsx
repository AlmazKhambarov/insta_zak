/** @format */

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
import { Comment, MessageOutlined } from "@mui/icons-material";
import Comments from "../Comments/Comments";
// import CommentModal from "../User/CommentModal/CommentModal";
const Posts = ({user}) => {
  const [article, setArticles] = useState(null);
  const dispatch = useDispatch();
  // const { user } = useSelector((state) => state.login);
  const [modal, setModal] = useState(false);
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
  // console.log(article);
  return (
    <>
      <div className='posts'>
        <div className='navbar'>
          <input type='search' className='navbar_search' placeholder='Search' />
        </div>
        <div className='post_card'>
          {article?.map((el) => (
            // <div className="card">
            //   <div className="card_user">
            //     <img src={user_img} alt="" />
            //     <span>Author:{el.createdBy}</span>
            //   </div>
            //   <div className="card_post">
            //     <img src={el.imageUrl} alt="" className="card_post_img" />
            //   </div>
            //   <div className="card__title">
            //     <span>
            //       <p>{el.createdBy}:</p>
            //       {el.title}
            //     </span>
            //   </div>
            //   <div className="card_items">
            //     <Likes id={el.id} likes={el.likes} user={user} />
            // <span
            //   onClick={() =>
            //     navigate(`/home/comment/${el.id}`) ||
            //     dispatch(postsUpload(el))
            //   }
            // >
            //       <ModeCommentIcon sx={{ fontSize: "30px" }} />
            //     </span>
            //     <Saved />
            //   </div>
            // </div>

            <>
              <div key={el.id} class='card-wrapper conta-flex'>
                <div class='card-header grid'>
                  <div class='header-img-container conta-flex'>
                    {/* this is Home and this do everiy think */}
                    <img
                      class='card-header-img'
                      src={el.createdUserPhoto}
                      alt=''
                    />
                  </div>
                  <span class='card-title'>{el.createdBy}</span>

                  {/* this is Home and this do everiy think */}
                  <span class='card-subtitle'>{el.title}</span>
                  <div class='card-opt-btn conta-flex'>
                    <i class='bi bi-three-dots'></i>
                  </div>
                </div>
                <div class='card-img-container'>
                  <img src={el.imageUrl} class='card-img' alt='' />
                  {/* this is Home and this do everiy think */}
                </div>
                <div class='card-data conta-flex'>
                  <div class='card-icons conta-flex'>
                    <span class='card-icon card-icon-left'>
                      <Likes id={el.id} likes={el.likes} />
                    <Comment sx={{fontSize:"25px"}}/>
                    </span>
                    {/* this is Home and this do everiy think */}
                    <span class='card-icon card-icon-left'>
                      <i class='bi bi-chat'></i>
                    </span>
                    {/* this is Home and this do everiy think */}
                    <span class='card-icon card-icon-left'>
                      <i class='bi bi-send'></i>
                    </span>
                    <span class='card-icon card-icon-right'>
                      <i class='bi bi-bookmark'></i>
                      {/* this is Home and this do everiy think */}
                    </span>
                  </div>
                  <span class='bold card-text'>{} Likes</span>
                  <span class='card-text'>
                    <span class='bold title-margin'>{el.createdBy}</span>
                  </span>
                  {/* <span
                // this is Home and this do everiy think
                class='card-text comments-btn'
                onClick={() => setCommentModal(el.id)}>
                See more comments
              </span> */}
                  {/* this is Home and this do everiy think */}

                  <span class='card-time'></span>
                  <div class='add-comment-container conta-flex'>
                    <span class='card-icon'>
                      <i class='bi bi-emoji-smile'></i>
                    </span>
                  </div>
                </div>
              </div>
              {modal == el.id ? (
                <Comments

                  // id={el.id}
                  modal={modal}
                  // postImg={el.imageUrl}
                  setModal={setModal  }
                  // createdUserPhoto={el.createdUserPhoto}
                />
              ) : null}
            </>
          ))}
        </div>
      </div>
      <Users user={user}/>
    </>
  );
};

export default Posts;
