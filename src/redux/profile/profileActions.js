import axios from 'axios';
import {
    FETCH_PROFILE,
    FETCH_OWN_FOODPLACE,
    EDIT_PROFILE,
    DISABLE_SAVE,
    ENABLE_SAVE,
    CHECK_USERNAME,
    CHECK_EMAIL,
    SAVE_CHANGES,
    CANCEL_CHANGES,
    // DELETE_ACCOUNT,
    EDITING_FOOD_PLACE,
    EDIT_FOOD_PLACE,
    ADDING_FOOD_PLACE,
    ADD_FOOD_PLACE,
    DELETE_FOOD_PLACE
} from './profileTypes';

// FETCH DATA ACTIONS

export const fetchProfile = (username) => {
    return (dispatch) => {
        axios.get(`https://ancient-garden-70007.herokuapp.com/api/profile/${username}`)
            .then(response => {
                const userProfile = response.data[0]
                axios.get(`https://ancient-garden-70007.herokuapp.com/api/getAllUsers`)
                    .then(response => {
                        const User_id = userProfile.User_id - 1
                        const Password = response.data[User_id].Password
                        dispatch({
                            type: FETCH_PROFILE,
                            payload: {
                                ...userProfile,
                                Password: Password
                            }
                        })
                    })
                if (userProfile.User_type === "Business_owner") {
                    dispatch(fetchOwnFoodPlace(userProfile.User_id))
                }
            })
            .catch(error => {
                console.log(error.message)
            })
    }
}
export const fetchOwnFoodPlace = (userID) => {
    return (dispatch) => {
        axios.get(`https://ancient-garden-70007.herokuapp.com/api/getOwnFoodPlace/${userID}`)
            .then(response => {
                const foodPlaceData = response.data
                foodPlaceData.map(foodPlace => {
                    axios.get(`https://ancient-garden-70007.herokuapp.com/api/comments/${foodPlace.Food_place_id}`)
                        .then(response => {
                            const Comments = response.data
                            let totalRating = 0
                            let count = 0
                            let avgRating = 0
                            Comments.map(comment => { 
                                totalRating += comment.Rating
                                count += 1
                                return null
                            })
                            avgRating = Math.round((totalRating/count)*10)/10
                            axios.get(`https://ancient-garden-70007.herokuapp.com/api/photos/5`)
                                .then(response => {
                                    const foodPlacePic = response.data[0].Picture
                                    const collatedFoodPlaceData = {
                                        ...foodPlace,
                                        Comments: Comments,
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

export const disableSave = () => {
    return {
        type: DISABLE_SAVE
    }
}

export const enableSave = () => {
    return {
        type: ENABLE_SAVE
    }
}

export const checkUsername = (username) => {
    return (dispatch) => {
        axios.post("https://ancient-garden-70007.herokuapp.com/api/checkUsername",
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
        axios.post("https://ancient-garden-70007.herokuapp.com/api/checkEmail",
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
        axios.patch("https://ancient-garden-70007.herokuapp.com/api/profile/update",
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
                dispatch({
                    type: SAVE_CHANGES,
                    payload: {
                        response: response.data,
                        newName,
                        newUsername,
                        newEmail,
                        newPassword,
                        newPicturePath,
                        accType
                    }
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

export const deleteAccount = (username) => {
    console.log("Doesn't actually delete yet, will try after merging", username)
    // add logout on delete (baka mas ok na sa fetch data reducer 'to)

    // axios.delete(`https://ancient-garden-70007.herokuapp.com/api/remove/customer/${username}`)
    //     .then(response => {
    //         console.log(response.data)
    //         dispatch({
    //             type: DELETE_ACCOUNT,
    //             payload: username
    //         })
    //     })
    //     .catch(error => {
    //         console.log(error.message)
    //     })
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
    foodPlacePhoto
) => {
    return (dispatch) => {
        axios.patch("https://ancient-garden-70007.herokuapp.com/api/editFoodPlace",
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
        axios.post(`https://ancient-garden-70007.herokuapp.com/api/addPhoto`, {
            foodPlaceID,
            foodPlacePhoto
        })
        .then(response => {
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
    picture
) => {
    return (dispatch) => {
        axios.post("https://ancient-garden-70007.herokuapp.com/api/addFoodPlace",
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
            dispatch({
                type: ADD_FOOD_PLACE,
                payload: {
                    foodPlaceName,
                    location,
                    priceRange,
                    description,
                    openTime,
                    closeTime,
                    daysOpen,
                    foodTypes,
                    owner,
                    picture
                }
            })
        })
        .catch(error => {
            console.log(error.message)
        })
    }
}

export const deleteFoodPlace = (foodPlaceId) => {
    return (dispatch) => {
        axios.delete(`https://ancient-garden-70007.herokuapp.com/api/removeFoodPlace/${foodPlaceId}`)
        .then(response => {
            console.log(response.data)
            dispatch({
                type: DELETE_FOOD_PLACE,
                payload: foodPlaceId
            })
        })
    }
}