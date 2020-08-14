import {
    FETCH_FOOD_PLACES,
} from './FFPtypes'

const initialState = {
    foodPlaces: [],
    listOfFoodPlaces: []
}

const fetchFoodPlacesReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_FOOD_PLACES:
            if(action.payload.Picture === undefined) {
                return {
                    ...state,
                    listOfFoodPlaces: [
                        ...state.listOfFoodPlaces,
                        action.payload
                    ]
                }
            }
            else if(state.foodPlaces.length < 4){
                return {
                    ...state,
                    foodPlaces: [
                        ...state.foodPlaces,
                        action.payload
                    ],
                }
            }
            break;
        default: return state
    }
}

export default fetchFoodPlacesReducer;