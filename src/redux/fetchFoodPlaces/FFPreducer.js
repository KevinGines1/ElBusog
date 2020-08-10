import {
    FETCH_FOOD_PLACES_REQUEST,
    FETCH_FOOD_PLACES_SUCCESS,
    FETCH_FOOD_PLACES_FAILURE
} from './FFPtypes'

const initialState = {
    loading: false,
    foodPlaces: [],
    error: ''
}

const fetchFoodPlacesReducer = (state = initialState, action) => {
    switch(action.type){
        case FETCH_FOOD_PLACES_REQUEST:
            return {
                ...state,
                loading: true
            }
        case FETCH_FOOD_PLACES_SUCCESS:
            return {
                ...state,
                loading: false,
                foodPlaces: [
                    ...state.foodPlaces,
                    action.payload
                ],
                error: ''
            }
        case FETCH_FOOD_PLACES_FAILURE:
            return {
                ...state,
                loading: false,
                foodPlaces: [],
                error: action.payload
            }
        default: return state
    }
}

export default fetchFoodPlacesReducer;