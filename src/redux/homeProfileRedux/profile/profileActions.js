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

// FETCH DATA ACTIONS

// export const fetchProfile = (username) => {
//     return (dispatch) => {
//         axios.get(`https://ancient-garden-70007.herokuapp.com/api/profile/${username}`)
//             .then(response => {
//                 const userProfile = response.data[0]
//                 axios.get(`https://ancient-garden-70007.herokuapp.com/api/getAllUsers`)
//                     .then(response => {
//                         console.log(response.data)
//                         response.data.map(user => {
//                             if (user.User_id === userProfile.User_id) {
//                                 dispatch({
//                                     type: FETCH_PROFILE,
//                                     payload: {
//                                         ...userProfile,
//                                         Password: user.Password
//                                     }
//                                 })
//                             }
//                             return null
//                         })
//                     })
//                 if (userProfile.User_type === "Business_owner") {
//                     dispatch(fetchOwnFoodPlace(userProfile.User_id))
//                 }
//             })
//             .catch(error => {
//                 console.log(error.message)
//             })
//     }
// }

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
    newName,
    newLocation,
    newPrice,
    newDesc,
    newOpen,
    newClose,
    newDays,
    newFoodTypes,
    owner,
    foodPlaceID,
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
        owner,
        foodPlaceID,
        "NEW:",
        foodPlacePhoto,
        "OLD:",
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
                owner
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
                        owner,
                        foodPlaceID,
                        foodPlacePhoto
                    }
                })
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