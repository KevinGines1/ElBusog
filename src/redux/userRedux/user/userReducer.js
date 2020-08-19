import { 
	FETCH_USERS_REQUEST,
	FETCH_USERS_SUCCESS,
	FETCH_USERS_FAILURE,
	REGISTER,
	ADD_USER_FAILURE,
	LOGIN_USER,
	LOGIN_FAIL,
	GET_PROFILE,
	LOGOUT_USER,
	CHECK_USERNAME,
	CHECK_EMAIL,
	RESET_REGISTER
} from './userTypes'


const initialState = {
	loading:  false,
	users: [],
	userInfo: {Name: null, Picture: null, User_type: null, isLoggedIn: false},
	error: '',
	usernameVerified: false,
	emailVerified: false
}

const userReducer = (state = initialState, action) =>{
	switch(action.type) {
		case FETCH_USERS_REQUEST: return {
			...state,
			loading: true
		}
		case FETCH_USERS_SUCCESS: return {
			...state,
			loading: false,
			users: action.payload,
			error: ''
		}
		case FETCH_USERS_FAILURE: return {
			...state,
			loading: false,
			users: [],
			error: action.payload
		}
		case REGISTER: 
			if(this.state.usernameVerified === true && this.state.emailVerified === true) {
				return {
					loading: false,
					users: [...state.users, action.payload],
					error: ''
				}
			}else {
				return {
					...state
				}
			}
		case ADD_USER_FAILURE: return {
			...state,
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
		case GET_PROFILE: return {
			...state,
			userInfo: action.payload,	
		}
		case LOGOUT_USER: return {
			...state,
			userInfo: {Name: null, Picture: null, User_type: null, isLoggedIn: false}
		}
		case CHECK_USERNAME: return {
			...state,
			usernameVerified: true
		}
		case CHECK_EMAIL: return {
			...state,
			emailVerified: true
		}
		case RESET_REGISTER: return {
			...state,
			usernameVerified: false,
			emailVerified: false
		}
		
		default: return state
	}
}

export default userReducer