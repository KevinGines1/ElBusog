import axios from 'axios';
import {
  FETCH_COMMENT,
  ADD_COMMENT,
  REMOVE_COMMENT
} from './commentTypes';
import { SERVER_URL } from '../../serverUrl'

export const fetchComment = foodPlaceID => {
  return (dispatch) => {
      axios.get(`${SERVER_URL}/comments/${foodPlaceID}`)
          .then(response => {
              const comments = response.data
              comments.map(comment => {
                axios.get(`${SERVER_URL}/profile/${comment.User_id}`)
                  .then(response => {
                    const commentWithUsername = {
                      ...comments,
                      Username: response.data.Username
                    }
                    dispatch({
                      type: FETCH_COMMENT,
                      payload: commentWithUsername
                    })
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
          console.log(error.message);
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
    axios.delete(`${SERVER_URL}/remove/comment`, parameters)
      .then(response => dispatch({
        type: REMOVE_COMMENT,
        payload: parameters
      }))
      .catch(error => {
          console.log(error.message);
      })
  }
};
