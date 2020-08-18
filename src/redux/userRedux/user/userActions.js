import axios from 'axios'
import {  
	FETCH_USERS_REQUEST,
	FETCH_USERS_SUCCESS,
	FETCH_USERS_FAILURE,
	REGISTER,
	ADD_USER_FAILURE,
	LOGIN_USER,
	LOGIN_FAIL,
	GET_PROFILE,
	LOGOUT_USER
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

			//get user profile if login is correct
			if(response.data.authorized === true) {
				dispatch(getUser(userObj.username))
				
			}

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

export const getUser = username => {
	return (dispatch) => {

		const urlString = "https://ancient-garden-70007.herokuapp.com/api/profile/"
		const url = urlString.concat(username)
		console.log(url)
		axios.get(url, username, {
     		headers : { 'Content-Type': 
            'application/json' }
		})

		.then(response => {
			console.log(response.data)
			var payload = response.data[0]
			payload.isLoggedIn = true		//use this only if logging in
			dispatch({
				type: GET_PROFILE,
				payload: payload
			})

		})
		.catch(error =>{

		})
	}
}

export const logoutUser = () => {
	return {
		type: LOGOUT_USER
	}
}