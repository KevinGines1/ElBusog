import axios from 'axios'
import {  
	FETCH_USERS_REQUEST,
	FETCH_USERS_SUCCESS,
	FETCH_USERS_FAILURE,
	REGISTER,
	ADD_USER_FAILURE,
	LOGIN_USER,
	LOGIN_FAIL
} from './userTypes'

export const fetchUsersRequest = () => {
	return {
		type: FETCH_USERS_REQUEST
	}
}

export const fetchUsersSuccess = users => {
	return {
		type: FETCH_USERS_SUCCESS,
		payload: users
	}
}

export const fetchUsersFailure = error => {
	return {
		type: FETCH_USERS_FAILURE,
		payload: error
	}
}

//api request
export const fetchUsers = () => {
	return (dispatch) => {
		dispatch(fetchUsersRequest)
		axios.get('http://ancient-garden-70007.herokuapp.com/api/getAllUsers')
			
		.then(response => {
			const users = response.data
			dispatch(fetchUsersSuccess(users))
		})
		.catch(error => {
			const errorMsg = error.message
			dispatch(fetchUsersFailure(errorMsg))
		})
	}
}

export const addUserFailure = error => {
	return {
		type: ADD_USER_FAILURE,
		payload: error
	}
}

export const addUser = userObj => {
	return (dispatch) => {
			console.log("userObj")
			axios.post('https://ancient-garden-70007.herokuapp.com/api/register', userObj, {
	     		headers : { 'Content-Type': 
	            'application/json' }
			})

			.then(response => {
				console.log(response.data)
				dispatch({
					type: REGISTER,
					payload: response.data
				})
			})
			.catch(error =>{
				const errorMsg = error.message
				dispatch(addUserFailure(errorMsg))
			})
		}
}

export const loginFail = error => {
	return {
		type: LOGIN_FAIL,
		payload: error
	}
}

export const loginUser = userObj => {
	return (dispatch) => {
		axios.post('https://ancient-garden-70007.herokuapp.com/api/login', userObj, {
     		headers : { 'Content-Type': 
            'application/json' }
		})

		.then(response => {
			console.log(response.data)
			dispatch({
				type: LOGIN_USER,
				payload: response.data
			})
			alert(response.data.msg)
		})
		.catch(error =>{
			const errorMsg = error.message
			dispatch(loginFail(errorMsg))
		})
	}
}