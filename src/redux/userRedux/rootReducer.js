
import { combineReducers } from 'redux'
import userReducer from './user/userReducer'

const rootReducer = combineReducers({
	//add reducer here
	user: userReducer
})

export default rootReducer