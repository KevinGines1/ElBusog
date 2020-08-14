import { RANDOMIZE_FOODPLACE, GET_JEEP_STOP } from './randomizerTypes.js'

const INITIAL_STATE = {
    listOfFoodPlacesRanked: null,
	listOfFoodPlaces: [],
	nearestJeepStop: null,
	nearestJeepType: null,
}
  
// Reducers
const reducers = (state = INITIAL_STATE, action) => {
	if (action.type === RANDOMIZE_FOODPLACE) {
		return {...state, listOfFoodPlacesRanked: action.payload}
	}
	else if (action.type === GET_JEEP_STOP) {
		return {...state, nearestJeepStop: action.payload, nearestJeepType: action.payload}
	}
  	return state;
};

export default reducers;