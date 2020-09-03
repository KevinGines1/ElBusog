import { combineReducers } from 'redux';
import commentReducer from './comment/commentReducer';

const rootReducer = combineReducers({
	comment: commentReducer
});

export default rootReducer;
