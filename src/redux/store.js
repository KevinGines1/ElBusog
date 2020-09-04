import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'

// reducers
// import randomizerReducers from './randomizer/randomizerReducers';

//old zeit redux state
// import homeProfileReducer from './homeProfileRedux/rootReducer'

//new zeit redux
import profileReducer from './profile/profileReducer'
import foodPlaceReducer from './foodPlaceRedux/fetchFoodPlaces/FFPreducer'

//old jai
// import foodPlaceReducer from './foodPlaceRedux/rootReducer';

//new jai
import commentsReducer from './foodPlaceRedux/comment/commentReducer'
//this will be the pinaka-main store

// place here all the reducers from all pages
const rootReducer = combineReducers({
    // zoren: randomizerReducers,
    user: profileReducer,
    foodplaces: foodPlaceReducer, // contains randomizer and jeepney routes as well
    foodPlaceComments: commentsReducer,
})

const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(thunk)));

export default store;
