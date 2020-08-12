import { createStore, applyMiddleware } from 'redux';
import Redux from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from './rootReducer';

const store = createStore(
    rootReducer, 
    composeWithDevTools(applyMiddleware(Redux))
    )

export default store;