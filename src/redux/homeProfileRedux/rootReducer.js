import { combineReducers } from 'redux'
import profileReducer from './profile/profileReducer'
import fetchFoodPlacesReducer from './fetchFoodPlaces/FFPreducer'

const rootReducer = combineReducers({
    profile: profileReducer,
    foodPlacesData: fetchFoodPlacesReducer,
})

export default rootReducer;