import {
  FETCH_COMMENT,
  ADD_COMMENT,
  REMOVE_COMMENT,
} from './commentTypes'

const initialState = {
  comment: []
}

const commentReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_COMMENT:
      return {
        ...state,
        comment: action.payload
      }
    case ADD_COMMENT:
      const today = new Date();
      const date = today.getFullYear()+'-'+('0'+(today.getMonth()+1)).slice(-2)+'-'+('0'+today.getDate()).slice(-2);
      const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
      const dateTime = date+'T'+time;

      return {
        ...state,
        comment: [
          {
            User_id: action.payload.userID,
            Username: action.payload.username,
            Food_place_id: action.payload.foodPlaceID,
            Rating: action.payload.rating,
            Comment: action.payload.comment,
            Date_posted: dateTime
          }, ...state.comment
        ]
      }
    case REMOVE_COMMENT:
      return {
        ...state,
        comment: state.comment.filter(com => com.Comment !== action.payload)
      }
    default: return state;
  }
}

export default commentReducer;

// {
//   if((comment.User_id === action.payload.userID) && (comment.Food_place_id === action.payload.foodPlaceID) && (comment.Rating === action.payload.rating)) {
//     comment.Comment !== action.payload.comment;
//   }
// }
