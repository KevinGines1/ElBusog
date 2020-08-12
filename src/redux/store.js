import { createStore , combineReducers, applyMiddleware} from 'redux';
import randomizerReducers from './randomizer/randomizerReducers';
import {composeWithDevTools} from 'redux-devtools-extension'
import homeProfileReducer from './homeProfileRedux/rootReducer'
import thunk from 'redux-thunk'
//this will be the pinaka-main store

// place here all the reducers from all pages
const rootReducer = combineReducers({
    zoren : randomizerReducers,
    zeit : homeProfileReducer
})

const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(thunk)));

export default store;