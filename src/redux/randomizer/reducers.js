import { RANDOMIZE_FOODPLACE, GET_ALL_FOOD_PLACES } from './types.js'

const INITIAL_STATE = {
    listOfFoodPlacesRanked: null,
    listOfFoodPlaces: []
}
  
// Reducers
const reducers = (state = INITIAL_STATE, action) => {
	if (action.type === RANDOMIZE_FOODPLACE) {
		return {...state, listOfFoodPlacesRanked: action.payload}
	}
	else if (action.type === GET_ALL_FOOD_PLACES) {
		return {...state, listOfFoodPlaces: action.payload}
	}
  	return state;
};

export default reducers;