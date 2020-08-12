import { createStore , combineReducers, applyMiddleware} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension'
import thunk from 'redux-thunk'

// reducers
import randomizerReducers from './randomizer/randomizerReducers';
import homeProfileReducer from './homeProfileRedux/rootReducer'
import userReducer from './userRedux/rootReducer'
//this will be the pinaka-main store

// place here all the reducers from all pages
const rootReducer = combineReducers({
    zoren : randomizerReducers,
    zeit : homeProfileReducer,
    aaron: userReducer
})

const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(thunk)));

export default store;