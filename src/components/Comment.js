import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchComment, addComment, removeComment } from '../redux';
import Ratings from 'react-ratings-declarative';
import Rate from './Rate';
import './Comment.css';

function Comment(props) {
  const dispatch = useDispatch();
  const comments = useSelector(state => state.jai.comment);
  const currentUser = useSelector(state => state.zeit.profile);
  const currentUserIsLoggedIn = currentUser.isLoggedIn;
  const eventHandler = data => setRating(data);
  const [rating, setRating] = useState(null);
  const [updateComment, setUpdateComment] = useState(true);
  const [currentComment, setCurrentComment] = useState("");

  useEffect(() => {
      dispatch(fetchComment(props.foodPlaceID));
      // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updateComment])

  const handleFormSubmit = (event) => {
    event.preventDefault();
    if(currentUserIsLoggedIn) {
      if(rating !== null && currentComment !== "") {
        dispatch(addComment(parseInt(currentUser.User_id), props.foodPlaceID, rating, currentComment))
        reloadComment()
      }
      else {
        alert("Please rate and comment.")
      }
    }
    else {
      alert("You must be logged in to use this feature.")
    }
  }

  function displayComment(comment, index) {
    return (
      <div className="margin-tb-10" key={index}>
        <div className="nameStarCloseContainer">
          <div className="nameStarContainer">
            <strong>{comment.Username}</strong>
            <Ratings
              rating = {comment.Rating}
              widgetDimensions="18px"
              widgetEmptyColors="#b3b3b3"
              widgetRatedColors="#e07f3e"
              widgetSpacings="1.5px"
            >
              <Ratings.Widget />
              <Ratings.Widget />
              <Ratings.Widget />
              <Ratings.Widget />
              <Ratings.Widget />
            </Ratings>
          </div>
          <button className="circleXButton" onClick = {() => dispatch(removeComment(comment.User_id, props.foodPlaceID, comment.Rating, comment.Comment))}>X</button>
        </div>
        <div className="commentContainer">{comment.Comment}</div>
        <p>Date Posted: {comment.Date_posted.slice(0, 10)}</p>
      </div>
    )
  }

  function reloadComment() {
    comments.comment = []
    setUpdateComment(!updateComment)
  }

  return (
    <div className="margin-lr-20">
      <form onSubmit = {handleFormSubmit}>
        <Rate onChange = {eventHandler}/>
        <input
          className="textbox margin-tb-10"
          type="text"
          placeholder = "Comment"
          onChange = {(event) => setCurrentComment(event.target.value)}
        />
        <button className="button margin-tb-10" type="submit">Add Comment</button>
      </form>
      {comments.comment.map((comment, index) => displayComment(comment, index))}
    </div>
  )
}

export default Comment;
