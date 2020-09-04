import axios from 'axios';
import {
    FETCH_PROFILE,
    FETCH_OWN_FOODPLACE,
    EDIT_PROFILE,
    CHECK_USERNAME,
    CHECK_EMAIL,
    CHECK_PASSWORD,
    SAVE_CHANGES,
    CANCEL_CHANGES,
    DELETE_ACCOUNT,
    LOGOUT_PROFILE,
    EDITING_FOOD_PLACE,
    EDIT_FOOD_PLACE,
    ADDING_FOOD_PLACE,
    ADD_FOOD_PLACE,
    DELETE_FOOD_PLACE,
    UPLOAD_IMAGE
} from './profileTypes';
import { SERVER_URL } from '../../serverUrl'


// testing aaron's codes
import Swal from 'sweetalert2'

export const verifyUsername = userObj => {
    const username = userObj.Username
    return (dispatch) => {
        axios.post(`${SERVER_URL}/checkUsername`, { username }, {
            headers: {
                'Content-Type':
                    'application/json'
            }
        })
            .then(response => {
                if (response.data.infoValid === true) {
                    dispatch(verifyEmail(userObj))
                    // dispatch({
                    // 	type: CHECK_USERNAME
                    // })
                } else {
                    Swal.fire({
                        title: 'Invalid Username',
                        text: 'Username is already taken.',
                        icon: 'info',
                        confirmButtonText: 'Okay'
                    })
                }
            })
            .catch(error => {
                console.log("VERIFY USERNAME ERROR", error)
            })
    }
}

export const verifyEmail = userObj => {
    const email = userObj.Email
    return (dispatch) => {
        axios.post(`${SERVER_URL}/checkEmail`, { email }, {
            headers: {
                'Content-Type':
                    'application/json'
            }
        })
            .then(response => {
                // dispatch(resetRegisterEmail())
                const infoValid = response.data.infoValid
                if (infoValid) {
                    dispatch(addUser(userObj))
                    // dispatch({
                    // 	type: CHECK_EMAIL,
                    // 	payload: { infoValid: true }
                    // })
                } else {
                    Swal.fire({
                        title: 'Invalid Email',
                        text: 'Email is already taken.',
                        icon: 'info',
                        confirmButtonText: 'Okay'
                    })
                }
            })
            .catch(error => {
                console.log("CHECK EMAIL ERROR: ", error)
                // dispatch(addUserFailure(errorMsg))
            })
    }
}

export const getUserFromToken = token => {
    return (dispatch) => {

        const url = `${SERVER_URL}/verifyToken/`
        // console.log(url)
        axios.post(url, { token }, {
            headers: {
                'Content-Type':
                    'application/json'
            }
        })

            .then(response => {
                // var payload = response.data.userInfo
                // payload.isLoggedIn = true		//use this only if logging in

                dispatch(getUser(response.data.User_id))
                // dispatch(fetchProfile(payload))
            })

            .catch(error => {
                alert("For security purposes, please log-in again.")
            })
    }
}

export const addUser = userObj => {
    return (dispatch) => {
        // console.log(userObj)
        axios.post(`${SERVER_URL}/register`, userObj, {
            headers: {
                'Content-Type':
                    'application/json'
            }
        })
            .then(response => {
                Swal.fire({
                    title: 'Register Complete!',
                    text: 'Successfully created new account.',
                    icon: 'info',
                    confirmButtonText: 'Okay'
                })
                localStorage.setItem('token', response.data.token)
                dispatch(getUserFromToken(response.data.token))
            })
            .catch(error => {
                console.log("REGISTRATION ERROR: ", error)
                // dispatch(addUserFailure(errorMsg))
            })

    }

}

export const loginUser = userObj => {
    return (dispatch) => {
        axios.post(`${SERVER_URL}/login`, userObj, {
            headers: {
                'Content-Type':
                    'application/json'
            }
        })
            .then(response => {
                //get user profile if login is correct
                if (response.data.authorized === true) {
                    // dispatch(getUser(userObj.username))
                    localStorage.setItem('token', response.data.token)
                    dispatch(getUserFromToken(response.data.token))
                }

                // dispatch({
                // 	type: LOGIN_USER,
                // 	payload: response.data
                // })
                if (response.data.authorized === true) {
                    Swal.fire({
                        title: 'Success!',
                        text: 'Successfully logged in.',
                        icon: 'success',
                        confirmButtonText: 'Okay'
                    })
                } else {
                    Swal.fire({
                        title: 'Error!',
                        text: 'Username and password did not match.',
                        icon: 'error',
                        confirmButtonText: 'Okay'
                    })
                }
            })
            .catch(error => {
                console.log(error)
            })
    }
}

export const getUser = User_id => {
    return (dispatch) => {

        const urlString = `${SERVER_URL}/profile/`
        const url = urlString.concat(User_id)
        axios.get(url, User_id, {
            headers: {
                'Content-Type':
                    'application/json'
            }
        })

            .then(response => {
                var payload = response.data[0]
                payload.isLoggedIn = true		//use this only if logging in

                // calls fetchProfile action from profileActions
                dispatch(fetchProfile(payload))

            })
            .catch(error => {
                console.log("GET USER ERROR: ", error)
            })
    }
}
// end of aaron's codes


// FETCH DATA ACTIONS

export const fetchProfile = (userInfo) => {
    return (dispatch) => {
        if (userInfo.User_type === "Business_owner") {
            dispatch(fetchOwnFoodPlace(userInfo.User_id))
        }
        dispatch({
            type: FETCH_PROFILE,
            payload: userInfo
        })
    }
}

export const fetchOwnFoodPlace = (userID) => {
    return (dispatch) => {
        axios.get(`${SERVER_URL}/getOwnFoodPlace/${userID}`)
            .then(response => {
                const foodPlaceData = response.data
                foodPlaceData.map(foodPlace => {
                    axios.get(`${SERVER_URL}/comments/${foodPlace.Food_place_id}`)
                        .then(response => {
                            const Reviews = response.data
                            let totalRating = 0
                            let count = 0
                            Reviews.map(review => {
                                totalRating += review.Rating
                                count += 1
                                return null
                            })
                            const avgRating = Math.round((totalRating / count) * 10) / 10
                            axios.get(`${SERVER_URL}/photos/${foodPlace.Food_place_id}`)
                                .then(response => {
                                    let foodPlacePic = null
                                    if (response.data.length !== 0) {
                                        foodPlacePic = response.data[0].Picture
                                    }
                                    const collatedFoodPlaceData = {
                                        ...foodPlace,
                                        Reviews: Reviews,
                                        Picture: foodPlacePic,
                                        Rating: avgRating
                                    }
                                    dispatch({
                                        type: FETCH_OWN_FOODPLACE,
                                        payload: collatedFoodPlaceData
                                    })
                                })
                        })
                    return null
                })
            })
            .catch(error => {
                console.log(error.message)
            })
    }
}

// MY PROFILE ACTIONS
export const editProfile = () => {
    return {
        type: EDIT_PROFILE
    }
}

export const checkUsername = (username) => {
    return (dispatch) => {
        axios.post(`${SERVER_URL}/checkUsername`,
            { username })
            .then(response => {
                dispatch({
                    type: CHECK_USERNAME,
                    payload: response.data
                })
            })
            .catch(error => {
                console.log(error.message)
            })
    }
}

export const checkEmail = (email) => {
    return (dispatch) => {
        axios.post(`${SERVER_URL}/checkEmail`,
            { email })
            .then(response => {
                dispatch({
                    type: CHECK_EMAIL,
                    payload: response.data
                })
            })
            .catch(error => {
                console.log(error.message)
            })
    }
}

export const checkPassword = (password, userID) => {
    return (dispatch) => {
        axios.post(`${SERVER_URL}/checkPassword`,
            { password, userID })
            .then(response => {
                dispatch({
                    type: CHECK_PASSWORD,
                    payload: response.data.msg
                })
            })
            .catch(error => {
                console.log(error.message)
            })
    }
}

export const saveChanges = (
    userID,
    origUsername,
    newName,
    newUsername,
    newEmail,
    newPassword,
    newPicturePath,
    accType
) => {
    return (dispatch) => {
        axios.patch(`${SERVER_URL}/profile/update`,
            {
                userID,
                origUsername,
                newName,
                newUsername,
                newEmail,
                newPassword,
                newPicturePath,
                accType
            })
            .then(response => {
                console.log(response.data)
                axios.get(`${SERVER_URL}/profile/${userID}`)
                    .then(response => {
                        const userInfo = response.data[0]
                        dispatch({
                            type: SAVE_CHANGES,
                            payload: userInfo
                        })
                    })
            })
            .catch(error => {
                console.log(error.message)
            })
    }
}

export const cancelChanges = () => {
    return {
        type: CANCEL_CHANGES
    }
}

export const deleteAccount = (username, accType) => {
    // add logout on delete
    return (dispatch) => {
        if (accType === "Customer") {
            axios.delete(`${SERVER_URL}/remove/customer/${username}`)
                .then(response => {
                    console.log(response.data)
                    dispatch({
                        type: DELETE_ACCOUNT,
                        payload: username
                    })
                })
                .catch(error => {
                    console.log(error.message)
                })
        }
        if (accType === "Business_owner") {
            axios.delete(`${SERVER_URL}/remove/owner/${username}`)
                .then(response => {
                    console.log(response.data)
                    dispatch({
                        type: DELETE_ACCOUNT
                    })
                })
                .catch(error => {
                    console.log(error.message)
                })
        }
    }
}

export const logoutProfile = () => {
    localStorage.removeItem('token')
    return {
        type: LOGOUT_PROFILE,
    }
}

// DASHBOARD ACTIONS

export const editingFoodPlace = (foodPlace) => {
    return {
        type: EDITING_FOOD_PLACE,
        payload: foodPlace
    }
}

export const editFoodPlace = (
    foodPlaceID,
    newName,
    newLocation,
    newPrice,
    newDesc,
    newOpen,
    newClose,
    newDays,
    newFoodTypes,
    newLongitude,
    newLatitude,
    foodPlacePhoto,
    oldFoodPlacePhoto
) => {
    console.log(
        newName,
        newLocation,
        newPrice,
        newDesc,
        newOpen,
        newClose,
        newDays,
        newFoodTypes,
        newLongitude,
        newLatitude,
        foodPlaceID,
        foodPlacePhoto,
        oldFoodPlacePhoto)
    return (dispatch) => {
        axios.patch(`${SERVER_URL}/editFoodPlace`,
            {
                foodPlaceID,
                newName,
                newLocation,
                newPrice,
                newDesc,
                newOpen,
                newClose,
                newDays,
                newFoodTypes,
                newLongitude,
                newLatitude
            })
            .then(response => {
                console.log(response.data)
                if (foodPlacePhoto !== oldFoodPlacePhoto) {
                    axios.post(`${SERVER_URL}/remove/photo/${foodPlaceID}`, { oldFoodPlacePhoto })
                        .then(response => {
                            console.log(foodPlaceID, response.data)
                        })
                    axios.post(`${SERVER_URL}/addPhoto/`, {
                        foodPlaceID, foodPlacePhoto
                    })
                        .then(response => {
                            console.log(response.data)
                        })
                        .catch(error => {
                            console.log(error.message)
                        })
                }
                dispatch({
                    type: EDIT_FOOD_PLACE,
                    payload: {
                        newName,
                        newLocation,
                        newPrice,
                        newDesc,
                        newOpen,
                        newClose,
                        newDays,
                        newFoodTypes,
                        newLongitude,
                        newLatitude,
                        foodPlaceID,
                        foodPlacePhoto
                    }
                })
            })
            .catch(error => {
                console.log(error.message)
            })
    }
}

export const addingFoodPlace = () => {
    return {
        type: ADDING_FOOD_PLACE
    }
}

export const addFoodPlace = (
    foodPlaceName,
    location,
    priceRange,
    description,
    openTime,
    closeTime,
    daysOpen,
    foodTypes,
    owner,
    latitude,
    longitude,
    foodPlacePhoto
) => {
    return (dispatch) => {
        axios.post(`${SERVER_URL}/addFoodPlace`,
            {
                foodPlaceName,
                location,
                priceRange,
                description,
                openTime,
                closeTime,
                daysOpen,
                foodTypes,
                latitude,
                longitude,
                owner
            })
            .then(response => {
                const foodPlaceID = response.data[0].Food_place_id
                axios.post(`${SERVER_URL}/addPhoto/`, {
                    foodPlaceID, foodPlacePhoto
                })
                    .then(response => {
                        console.log(response.data)
                        dispatch({
                            type: ADD_FOOD_PLACE,
                            payload: {
                                foodPlaceID,
                                foodPlaceName,
                                location,
                                priceRange,
                                description,
                                openTime,
                                closeTime,
                                daysOpen,
                                foodTypes,
                                owner,
                                latitude,
                                longitude,
                                foodPlacePhoto
                            }
                        })
                    })
            })
            .catch(error => {
                console.log(error.message)
            })
    }
}

export const deleteFoodPlace = (foodPlaceID, foodPlacePhoto) => {
    return (dispatch) => {
        axios.delete(`${SERVER_URL}/removeFoodPlace/${foodPlaceID}`)
            .then(response => {
                console.log(response.data)
                dispatch({
                    type: DELETE_FOOD_PLACE,
                    payload: foodPlaceID
                })
            })
        axios.post(`${SERVER_URL}/remove/photo/${foodPlaceID}`, { foodPlacePhoto })
            .then(response => {
                console.log(response.data)
            })
    }
}

export const uploadImage = (url) => {
    return {
        type: UPLOAD_IMAGE,
        payload: url
    }
}