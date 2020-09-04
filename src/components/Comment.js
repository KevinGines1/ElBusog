import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchComment, addComment, removeComment } from '../redux';
import Ratings from 'react-ratings-declarative';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';
import Rate from './Rate';
import './Comment.css';

function Comment(props) {
  const dispatch = useDispatch();
  const comments = useSelector(state => state.jai.comment);
  const currentUser = useSelector(state => state.zeit.profile);
  const currentUsername = currentUser.Username;
  const currentUserIsLoggedIn = currentUser.isLoggedIn;
  const eventHandler = data => setRating(data);
  const [rating, setRating] = useState(null);
  // const [updateComment, setUpdateComment] = useState(true);
  const [currentComment, setCurrentComment] = useState("");

  useEffect(() => {
      dispatch(fetchComment(props.foodPlaceID));
      // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleFormSubmit = (event) => {
    event.preventDefault();
    if(rating !== null && currentComment !== "") {
      dispatch(addComment(parseInt(currentUser.User_id), props.foodPlaceID, rating, currentComment, currentUsername))
      setCurrentComment("")
    }
    else {
      Swal.fire({
        title: 'Error!',
        text: 'Please give a rating and write a comment first.',
        icon: 'error',
        confirmButtonText: 'Okay'
      })
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
          {currentUsername === comment.Username &&
            <button className="circleXButton" onClick = {() => dispatch(removeComment(comment.User_id, props.foodPlaceID, comment.Rating, comment.Comment))}>X</button>
          }
        </div>
        <div className="commentContainer">{comment.Comment}</div>
        <p>Date Posted: {comment.Date_posted.split("T")[0]}</p>
      </div>
    )
  }

  // function reloadComment() {
  //   comments.comment = []
  //   setUpdateComment(!updateComment)
  // }

  return (
    <div className="margin-lr-20">
      {currentUserIsLoggedIn
      ? <form onSubmit = {handleFormSubmit}>
          <Rate onChange = {eventHandler}/>
          <input
            className="textbox margin-tb-10"
            type="text"
            placeholder = "Comment"
            value={currentComment}
            onChange = {(event) => setCurrentComment(event.target.value)}
          />
          <button className="button margin-tb-10" type="submit">Add Comment</button>
        </form>
      : <p>Please <Link to="/login"><u>Log-in</u></Link> or <Link to="/register"><u>Register</u></Link> to rate and comment.</p>
      }
      
      {comments.comment.map((comment, index) => displayComment(comment, index))}
    </div>
  )
}

export default Comment;
