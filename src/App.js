import React from 'react';
import Randomizer from './Randomizer.js';
import { createStore } from "redux";
import { Provider, connect } from 'react-redux';
import './App.css';

const INITIAL_STATE = {
  number: 0,
}

// Actions Type
const RANDOMIZE_FOODPLACE = 'randomize_foodplace';

// Actions
export const randomizeAction = (payload) => ({
  type: RANDOMIZE_FOODPLACE,
  payload: payload
})

// Reducers
const randomizeReducer = (state = INITIAL_STATE, action) => {
  if (action.type === RANDOMIZE_FOODPLACE) {
    return {...state, constraints: action.payload}
  }
  return state;
};

// Root Reducers (used to join reducers)
// const rootReducer = combineReducers({
//  random: randomizeReducer,
// });

// Store
const store = createStore(
  randomizeReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

// mapStateToProps
const mapStateToProps = (state => {
  return {
      number: state.number,
      constraints: state.constraints,
  };
});

// mapDispatchToProps
const mapDispatchToProps = dispatch => ({
  randomize: (payload) => dispatch(randomizeAction(payload)),
});

const Counter = (props) => (
  <div>
      <h2>{props.constraints}</h2>
      <Randomizer/>
  </div>
);
const ConnectedCounter = connect(mapStateToProps, mapDispatchToProps)(Counter);

const App = () => (
  <Provider store={store}>
      <ConnectedCounter />
  </Provider>
);

export default App;
