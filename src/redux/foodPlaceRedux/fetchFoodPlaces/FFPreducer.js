import {
    FETCH_FOOD_PLACES,
    RANDOMIZE_FOODPLACE,
    GET_JEEP_STOP
} from './FFPtypes'

const initialState = {
    foodPlaces: [],
    listOfFoodPlaces: [],
    //zoren's reducer
    listOfFoodPlacesRanked: null,
    jeepRoute: null,
    jeepRideStart: null,
    jeepRideStop: null,
}

const fetchFoodPlacesReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_FOOD_PLACES:
            let getFoodPlace = Math.floor(Math.random() * 2)
            if (state.foodPlaces.length < 4 && getFoodPlace === 1 && action.payload.Rating >= 3.5) {
                return {
                    ...state,
                    foodPlaces: [
                        ...state.foodPlaces,
                        action.payload
                    ],
                    listOfFoodPlaces: [
                        ...state.listOfFoodPlaces,
                        action.payload
                    ]
                }
            }
            else {
                return {
                    ...state,
                    listOfFoodPlaces: [
                        ...state.listOfFoodPlaces,
                        action.payload
                    ]
                }
            }
        case RANDOMIZE_FOODPLACE: // start of zoren's code
            return {
                ...state, listOfFoodPlacesRanked: action.payload
            }
        case GET_JEEP_STOP:
            return {
                ...state,
                jeepRoute: action.payload.route,
                jeepRideStart: action.payload.rideStart,
                jeepRideStop: action.payload.rideStop
            } // end
        default: return state
    }
}

export default fetchFoodPlacesReducer;