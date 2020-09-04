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
      const date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
      const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
      const dateTime = date+'T'+time;

      return {
        ...state,
        comment: [
          ...state.comment,
          {
            User_id: action.payload.userID,
            Food_place_id: action.payload.foodPlaceID,
            Rating: action.payload.rating,
            Comment: action.payload.comment,
            Date_posted: dateTime
          }
        ]
      }
    case REMOVE_COMMENT:
      return null
    default: return state;
  }
}

export default commentReducer;

// {
//   if((comment.User_id === action.payload.userID) && (comment.Food_place_id === action.payload.foodPlaceID) && (comment.Rating === action.payload.rating)) {
//     comment.Comment !== action.payload.comment;
//   }
// }
