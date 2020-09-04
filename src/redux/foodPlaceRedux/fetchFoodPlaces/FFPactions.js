import axios from 'axios'
import {
    FETCH_FOOD_PLACES,
    // zoren's code
    RANDOMIZE_FOODPLACE,
    GET_JEEP_STOP
} from './FFPtypes'
import { SERVER_URL } from '../../serverUrl'

// start of zoren's code
export const randomizeAction = (payload) => ({
    type: RANDOMIZE_FOODPLACE,
    payload: payload
})


export const getJeepRoute = (lat, lng, id) => {
    return (dispatch) => {
        axios.get(`${SERVER_URL}/locate/${lat}&${lng}&${id}`)
            .then(response => {
                // console.log(response.data)
                dispatch({
                    type: GET_JEEP_STOP,
                    payload: response.data
                })
            })
    }
}

// end 

export const fetchFoodPlaces = () => {
    return (dispatch) => {
        axios.get(`${SERVER_URL}/getAllFoodPlaces`)
            .then(response => {
                const foodPlaces = response.data
                foodPlaces.forEach((foodPlace) => {
                    dispatch(fetchFoodPlacesReview(foodPlace, foodPlace.Food_place_id))
                    // dispatch({
                    //     type: FETCH_FOOD_PLACES,
                    //     payload: foodPlace
                    // })
                })

            })
            .catch(error => {
                console.log(error.message)
            })
    }
}

export const fetchFoodPlacesReview = (foodPlace, foodPlaceID) => {
    return (dispatch) => {
        axios.get(`${SERVER_URL}/comments/${foodPlaceID}`)
            .then(response => {
                const Reviews = response.data
                let totalRating = 0
                let numOfRatings = 0
                Reviews.map(review => {
                    totalRating += review.Rating
                    numOfRatings += 1
                    return null
                })
                var avgRating = Math.round((totalRating / numOfRatings) * 10) / 10
                //if no rating, make it zero
                if (!avgRating) { avgRating = 0 }
                // this condition has been moved to FFPreducer.js
                // let getFoodPlace = Math.floor(Math.random() * 2)
                // if (getFoodPlace === 1 && avgRating >= 3.5) {
                //     dispatch(fetchFoodPlacesPhotos(foodPlace, foodPlaceID, avgRating))
                // }
                dispatch(fetchFoodPlacesPhotos(foodPlace, foodPlaceID, avgRating))
            })
    }
}

export const fetchFoodPlacesPhotos = (foodPlace, foodPlaceID, rating) => {
    return (dispatch) => {
        axios.get(`${SERVER_URL}/photos/${foodPlaceID}`)
            .then(response => {
                let Picture = ""
                if (response.data.length === 0) {
                    Picture = null
                } else {
                    Picture = response.data[0].Picture
                }
                const collatedFoodPlace = {
                    ...foodPlace,
                    Picture: Picture,
                    Rating: rating
                }
                dispatch({
                    type: FETCH_FOOD_PLACES,
                    payload: collatedFoodPlace
                })
            })
    }
}