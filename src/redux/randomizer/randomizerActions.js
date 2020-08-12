import { RANDOMIZE_FOODPLACE, GET_ALL_FOOD_PLACES } from './randomizerTypes';

// Actions
export const randomizeAction = (payload) => ({
	type: RANDOMIZE_FOODPLACE,
	payload: payload
})
export const getAllFoodPlaces = (payload) => ({
	type: GET_ALL_FOOD_PLACES,
	payload: payload
})