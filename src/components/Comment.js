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
  const [showComment, setShowComment] = useState(false);
  const [currentComment, setCurrentComment] = useState("");

  useEffect(() => {
    dispatch(fetchComment(props.foodPlaceID));

    return () => {
      comments.comment = []
    }
  }, [showComment])

  const handleFormSubmit = (event) => {
    event.preventDefault();
    //parseInt(currentUser.User_id)
    if(true) {
      if(rating !== null && currentComment !== "") {
        dispatch(addComment(4, props.foodPlaceID, rating, currentComment))
        setShowComment(false)
        setShowComment(true)
      }
      else {
        alert("Please rate and comment.")
      }
    }
    else {
      alert("You must be logged in to use this feature.")
    }
  }

  const foodPlaceComment = () => comments.comment.map(comment => displayComment(comment))

  function displayComment(comment) {
    return (
      <div>
        <p>
          <strong>{comment.Username}</strong><br/>
          <p>Date Posted: {comment.Date_posted.slice(0, 10)}</p>
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
        </p>
      </div>
    )
  }

  return (
    <div>
      <form onSubmit = {handleFormSubmit}>
        <Rate onChange = {eventHandler}/>
        <input type = "text" placeHolder = "Comment" onChange = {(event) => setCurrentComment(event.target.value)}/>
        <button type = "submit">Add Comment</button>
      </form>

      {showComment && foodPlaceComment}
      <button onClick = {() => setShowComment(!showComment)}>Show/Hide Comment</button>
      {console.log(showComment)}
    </div>
  )
}

export default Comment;
