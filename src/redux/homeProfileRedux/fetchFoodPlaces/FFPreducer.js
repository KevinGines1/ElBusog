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
            let getFoodPlace = Math.floor(Math.random() * 2)
            if(state.foodPlaces.length < 4 && getFoodPlace === 1 && action.payload.Rating >= 3.5){
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
        default: return state
    }
}

export default fetchFoodPlacesReducer;