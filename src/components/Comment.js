import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchComment, addComment, removeComment } from '../redux';
import Ratings from 'react-ratings-declarative';
import Rate from './Rate';

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
  }, [updateComment])

  const handleFormSubmit = (event) => {
    event.preventDefault();
    //parseInt(currentUser.User_id)
    if(true) {
      if(rating !== null && currentComment !== "") {
        dispatch(addComment(4, props.foodPlaceID, rating, currentComment))
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

  function displayComment(comment) {
    return (
      <div>
        <p>
          <strong>{comment.Username}</strong><br/>
          Date Posted: {comment.Date_posted.slice(0, 10)}<br/>
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
          </Ratings><br/>
          {comment.Comment}
          <button onClick = {() => dispatch(removeComment(comment.User_id, props.foodPlaceID, comment.Rating, comment.Comment))}>X</button>
        </p>
      </div>
    )
  }

  function reloadComment() {
    comments.comment = []
    setUpdateComment(!updateComment)
  }

  return (
    <div>
      <form onSubmit = {handleFormSubmit}>
        <Rate onChange = {eventHandler}/>
        <input type = "text" placeHolder = "Comment" onChange = {(event) => setCurrentComment(event.target.value)}/>
        <button type = "submit">Add Comment</button>
      </form>
      {comments.comment.map(comment => displayComment(comment))}
    </div>
  )
}

export default Comment;
