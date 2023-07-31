import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import "./CommentModal.scss";
const CommentModal = ({}) => {
  const paramId = useParams();
  const { articles } = useSelector((state) => state.post);
  console.log(articles);

  return (
    <div className="post__card">
      <div className="post__card__image">
        <img src={articles?.imageUrl} alt="" />
      </div>
      <div className="post__card__comments">
        <div className="post__card__comments__user">
            <span>{}</span>
          <span>{articles?.createdBy}</span>
        </div>
        <div className="post__card__comment__area">

        </div>
      </div>
    </div>
  );
};

export default CommentModal;
