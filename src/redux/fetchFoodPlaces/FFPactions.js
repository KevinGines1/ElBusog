import axios from 'axios'
import {
    FETCH_FOOD_PLACES_REQUEST,
    FETCH_FOOD_PLACES_SUCCESS,
    FETCH_FOOD_PLACES_FAILURE
} from './FFPtypes'

// not sure if fetch request, success, and failure are needed

export const fetchFoodPlacesRequest = () => {
    return {
        type: FETCH_FOOD_PLACES_REQUEST
    }
}

export const fetchFoodPlacesSuccess = (foodPlaces) => {
    return {
        type: FETCH_FOOD_PLACES_SUCCESS,
        payload: foodPlaces
    }
}

export const fetchFoodPlacesFailure = error => {
    return {
        type: FETCH_FOOD_PLACES_FAILURE,
        payload: error
    }
}

export const fetchFoodPlaces = () => {
    return (dispatch) => {
        dispatch(fetchFoodPlacesRequest)
        axios.get('https://ancient-garden-70007.herokuapp.com/api/getAllFoodPlaces')
            .then(response => {
                const foodPlaces = response.data
                foodPlaces.map(foodPlace => {
                    axios.get(`https://ancient-garden-70007.herokuapp.com/api/photos/${foodPlace.Food_place_id}`)
                        .then(response => {
                            let Picture = ""
                            if (response.data.length === 0) {
                                Picture = null
                            } else {
                                Picture = response.data[0].Picture
                            }
                            const collatedFoodPlace = {
                                ...foodPlace,
                                Picture: Picture
                            }
                            dispatch(fetchFoodPlacesSuccess(collatedFoodPlace))
                            // console.log(collatedFoodPlace)
                        })
                })
            })
            .catch(error => {
                const errorMessage = error.message
                dispatch(fetchFoodPlacesFailure(errorMessage))
            })
    }
}