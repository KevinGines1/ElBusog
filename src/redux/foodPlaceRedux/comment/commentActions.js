import axios from 'axios';
import {
  FETCH_COMMENT,
  ADD_COMMENT,
  REMOVE_COMMENT
} from './commentTypes';

export const fetchComment = foodPlaceID => {
  return (dispatch) => {
      axios.get(`https://ancient-garden-70007.herokuapp.com/api/comments/${foodPlaceID}`)
          .then(response => {
              const comments = response.data;
              dispatch({
                type: FETCH_COMMENT,
                payload: comments
              });
            })
            .catch(error => {
                console.log(error.message);
            })
};

export const addComment = (userID, foodPlaceID, rating, comment) => {
  return (dispatch) => {
    const parameters = {
      userID,
      foodPlaceID,
      rating,
      comment
    };
    axios.post(`https://ancient-garden-70007.herokuapp.com/api/addComment`, parameters)
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
    axios.delete(`https://ancient-garden-70007.herokuapp.com/api/remove/comment`, parameters)
      .then(response => dispatch({
        type: REMOVE_COMMENT,
        payload: parameters
      }))
      .catch(error => {
          console.log(error.message);
      })
  }
};
