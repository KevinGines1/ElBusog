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
    EDITING_FOOD_PLACE,
    EDIT_FOOD_PLACE,
    ADDING_FOOD_PLACE,
    ADD_FOOD_PLACE
} from './profileTypes';

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
                const foodPlaceData = response.data[0]
                dispatch({
                    type: FETCH_OWN_FOODPLACE,
                    payload: foodPlaceData
                })
            })
            .catch(error => {
                console.log(error.message)
            })
    }
}

// EDIT PROFILE ACTIONS
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

// FOOD PLACE ACTIONS

export const editingFoodPlace = (foodPlace) => {
    return {
        type: EDITING_FOOD_PLACE,
        payload: foodPlace
    }
}

export const editFoodPlace = (
    newName,
    newLoc,
    newPrice,
    newDesc,
    newOpen,
    newClose,
    newDays,
    newFoodTypes,
    owner,
    foodPlaceId
) => {
    return (dispatch) => {
        axios.post("https://ancient-garden-70007.herokuapp.com/api/editFoodPlace",
        {
            newName,
            newLoc,
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
            dispatch({
                type: EDIT_FOOD_PLACE,
                payload: {
                    newName,
                    newLoc,
                    newPrice,
                    newDesc,
                    newOpen,
                    newClose,
                    newDays,
                    newFoodTypes,
                    owner,
                    foodPlaceId
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
    owner
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
            console.log(response.data)
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
                    owner
                }
            })
        })
        .catch(error => {
            console.log(error.message)
        })
    }
}