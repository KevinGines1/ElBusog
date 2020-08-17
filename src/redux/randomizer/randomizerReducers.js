import { RANDOMIZE_FOODPLACE, GET_JEEP_STOP } from './randomizerTypes.js'

const INITIAL_STATE = {
    listOfFoodPlacesRanked: null,
	listOfFoodPlaces: [],
	jeepRoute: null,
	jeepRideStart: null,
	jeepRideStop: null,
}
  
// Reducers
const reducers = (state = INITIAL_STATE, action) => {
	if (action.type === RANDOMIZE_FOODPLACE) {
		return {...state, listOfFoodPlacesRanked: action.payload}
	}
	else if (action.type === GET_JEEP_STOP) {
		return {
			...state,
			jeepRoute: action.payload.route,
			jeepRideStart: action.payload.rideStart,
			jeepRideStop: action.payload.rideStop
		}
	}
  	return state;
};

export default reducers;