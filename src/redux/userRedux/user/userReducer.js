import { 
	FETCH_USERS_REQUEST,
	FETCH_USERS_SUCCESS,
	FETCH_USERS_FAILURE,
	REGISTER,
	ADD_USER_FAILURE,
	LOGIN_USER,
	LOGIN_FAIL
} from './userTypes'


const initialState = {
	loading:  false,
	users: [],
	error: ''
}

const userReducer = (state = initialState, action) =>{
	switch(action.type) {
		case FETCH_USERS_REQUEST: return {
			...state,
			loading: true
		}
		case FETCH_USERS_SUCCESS: return {
			loading: false,
			users: action.payload,
			error: ''
		}
		case FETCH_USERS_FAILURE: return {
			loading: false,
			users: [],
			error: action.payload
		}
		case REGISTER: 
			//const userUpdate = state.users.concat(action.payload);
			return {
				loading: false,
				users: [...state.users, action.payload],
				error: ''
		}
		case ADD_USER_FAILURE: return {
			loading: false,
			users: [],
			error: action.payload
		}
		case LOGIN_USER: return {
			...state,
			loading: false,
			error: ''
		}
		case LOGIN_FAIL: return {
			...state,
			loading: false,
			error: action.payload
		}
		default: return state
	}
}

export default userReducer