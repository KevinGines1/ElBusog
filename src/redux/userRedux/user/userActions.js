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
	LOGOUT_USER,
	CHECK_USERNAME,
	CHECK_EMAIL,
	RESET_REGISTER_EMAIL,
	RESET_REGISTER_USERNAME,
} from './userTypes'
import { fetchProfile } from '../../index'

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

export const resetRegisterUsername = () => {
	return(dispatch) => {
		dispatch({
			type:RESET_REGISTER_USERNAME
		})
	}
}

export const resetRegisterEmail = () => {
	return(dispatch) => {
		dispatch({
			type:RESET_REGISTER_EMAIL
		})
	}
}

export const verifyEmail = userObj => {
	console.log(userObj.Email)
	const email = userObj.Email
	return (dispatch) => {
		axios.post('https://ancient-garden-70007.herokuapp.com/api/checkEmail', {email}, {
     		headers : { 'Content-Type': 
            'application/json' }
		})
		.then(response => {
			
			dispatch(resetRegisterEmail())

			console.log("verifyEmail====================")
			console.log(response.data)
			console.log("===============================")
			if(response.data.infoValid === true) {
				dispatch(addUser(userObj))
				dispatch({
					type: CHECK_EMAIL
				})
			} else {
				alert("Email is already taken!")
			}
		})
		.catch(error =>{
			// const errorMsg = error.message
			// dispatch(addUserFailure(errorMsg))
		})
	}
}


export const verifyUsername = userObj => {
	const username = userObj.Username
	return (dispatch) => {
		axios.post('https://ancient-garden-70007.herokuapp.com/api/checkUsername', {username}, {
	     		headers : { 'Content-Type': 
	            'application/json' }
			})
		.then(response => {
			console.log("USERNAME")

			console.log(username)
			dispatch(resetRegisterUsername())

			console.log("verifyUsername===============")
			console.log(response.data)
			console.log("=============================")
			if(response.data.infoValid === true) {
				dispatch(verifyEmail(userObj))
				dispatch({
					type: CHECK_USERNAME
				})
			} else {
				alert("Username is already taken!")
			}
		})
		.catch(error =>{
			//console.log("LOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOL")
		})
	}
}

export const addUser = userObj => {
	return (dispatch) => {
		console.log(userObj)
			axios.post('https://ancient-garden-70007.herokuapp.com/api/register', userObj, {
	     		headers : { 'Content-Type': 
	            'application/json' }
			})
			alert("Successfully added user!")
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
				localStorage.setItem('token', response.data.token)
			}

			dispatch({
				type: LOGIN_USER,
				payload: response.data
			})
			// alert(response.data.msg)
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

			// calls fetchProfile action from profileActions
			dispatch(fetchProfile(payload))

			dispatch({
				type: GET_PROFILE,
				payload: payload
			})

		})
		.catch(error =>{

		})
	}
}

export const getUserFromToken = token => {
	return (dispatch) => {

		const url = "https://ancient-garden-70007.herokuapp.com/api/verifyToken/"
		// console.log(url)
		axios.post(url, {token}, {
     		headers : { 'Content-Type': 
            'application/json' }
		})

		.then(response => {
			// console.log(response.data.userInfo)
			var payload = response.data.userInfo
			payload.isLoggedIn = true		//use this only if logging in

			// calls fetchProfile action from profileActions
			dispatch(fetchProfile(payload))
			
			//this is obsolete since profile is on state.zeit.profile
			// dispatch({
			// 	type: GET_PROFILE,
			// 	payload: payload
			// })
		})

		.catch(error =>{
			alert("For security purposes, please log-in again.")
		})
	}
}

export const logoutUser = () => {
	localStorage.removeItem('token')
	return {
		type: LOGOUT_USER
	}
}