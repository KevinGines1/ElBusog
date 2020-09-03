import axios from 'axios';
import {
  FETCH_COMMENT,
  ADD_COMMENT,
  REMOVE_COMMENT
} from './commentTypes';
import { SERVER_URL } from '../../serverUrl';

export const fetchComment = foodPlaceID => {
  return (dispatch) => {
      axios.get(`${SERVER_URL}/comments/${foodPlaceID}`)
          .then(response => {
              const comments = response.data;
              comments.map(comments => {
                axios.get(`${SERVER_URL}/profile/${comments.User_id}`)
                  .then(response => {
                    const userInfo = response.data;
                    const commentsWithName = {
                      ...comments,
                      Username: userInfo[0].Username
                    }
                    dispatch({
                      type: FETCH_COMMENT,
                      payload: commentsWithName
                    });
                  })
              })
            })
            .catch(error => {
                console.log(error.message);
            })
  }
};

export const addComment = (userID, foodPlaceID, rating, comment) => {
  return (dispatch) => {
    const parameters = {
      userID,
      foodPlaceID,
      rating,
      comment
    };
    axios.post(`${SERVER_URL}/addComment`, parameters)
      .then(response => dispatch({
        type: ADD_COMMENT,
        payload: parameters
      }))
      .catch(error => {
        error.message === "currentRating.toFixed is not a function"
        ? window.location.reload(true)
        : console.log(error.message);
      })
  }
};

export const removeComment = (userID, foodPlaceID, rating, comment) => {
  return (dispatch) => {
    const parameters = {
      userID,
      foodPlaceID,
      rating,
      comment
    };
    axios.post(`${SERVER_URL}/remove/comment`, parameters)
      .then(response => {
        dispatch({
          type: REMOVE_COMMENT,
          payload: response
        })
      })
      .catch(error => {
        error.message === "Cannot read property 'comment' of null"
        ? window.location.reload(true)
        : console.log(error.message + "this one");
      })
  }
};
