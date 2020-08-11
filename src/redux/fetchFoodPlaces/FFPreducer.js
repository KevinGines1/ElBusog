import {
    FETCH_FOOD_PLACES,
} from './FFPtypes'

const initialState = {
    foodPlaces: [],
}

const fetchFoodPlacesReducer = (state = initialState, action) => {
    switch(action.type){
        case FETCH_FOOD_PLACES:
            if(state.foodPlaces.length < 4){
                return {
                    ...state,
                    foodPlaces: [
                        ...state.foodPlaces,
                        action.payload
                    ]
                }
            } else return state
        default: return state
    }
}

export default fetchFoodPlacesReducer;