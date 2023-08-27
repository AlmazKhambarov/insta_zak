import React from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import "./CommentModal.scss";
const CommentModal = ({}) => {
  const paramId = useParams();
  const { articles } = useSelector((state) => state.post);
  console.log(articles);
  const navigate = useNavigate();
  const handleClose = () => {
    navigate("/home");
  };
  return (
    <div className="post__card">
      <span className="close" onClick={handleClose}>
        x
      </span>
      <div className="post__card_con">
        <div className="post__card__image">
          <img src={articles?.imageUrl} alt="" />
        </div>
        <div className="post__card__comments">
          <div className="post__card__comments__user">
            <span>Almaz K</span>
          </div>
          <div className="post__card__comment__area">
            <input type="text" />
            <button>Send</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommentModal;
