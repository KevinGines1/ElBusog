import React from 'react';
import Randomizer from './Randomizer.js';
import { createStore } from "redux";
import { Provider, connect } from 'react-redux';
import './App.css';
import axios from 'axios';

const INITIAL_STATE = {
  listOfFoodPlacesRanked: null,
  listOfFoodPlaces: []
}

// Actions Type
const RANDOMIZE_FOODPLACE = 'randomize_foodplace';
const GET_ALL_FOOD_PLACES = 'get_all_food_places';

// Actions
export const randomizeAction = (payload) => ({
  type: RANDOMIZE_FOODPLACE,
  payload: payload
})
export const getAllFoodPlaces = (payload) => ({
  type: GET_ALL_FOOD_PLACES,
  payload: payload
})

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

// Root Reducers (used to join reducers)
// const rootReducer = combineReducers({
//  random: reducers,
// });

// Store
const store = createStore(
  reducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

// mapStateToProps
const mapStateToProps = (state => {
  return {
      number: state.number,
      listOfFoodPlaces: state.listOfFoodPlaces,
      listOfFoodPlacesRanked: state.listOfFoodPlacesRanked
  };
});

// mapDispatchToProps
const mapDispatchToProps = dispatch => ({
  randomize: (payload) => dispatch(randomizeAction(payload)),
  getallfoodplaces: (payload) => dispatch(getAllFoodPlaces(payload))
});

class Counter extends React.Component {
  componentDidMount() {
    axios.get('https://ancient-garden-70007.herokuapp.com/api/getAllFoodPlaces')
      .then(response => {
        console.log(response.data)
        this.props.getallfoodplaces(response.data);
      })
  }
  render() {
    return(
      <div>
        {this.props.listOfFoodPlacesRanked !== null &&
        <div>
          <h2>{this.props.listOfFoodPlacesRanked[0].Food_place_name}</h2>
          <p>You might also like...</p>
          <h3>{this.props.listOfFoodPlacesRanked[1].Food_place_name}</h3>
          <p>Note: This is for demo purposes only and not to be displayed here in final product. After choices are made, rankings are stored
          in the store and user will be redirected to the food place page.</p>
        </div>
        }
        <Randomizer/>
      </div>
    )
  }a
}
const ConnectedCounter = connect(mapStateToProps, mapDispatchToProps)(Counter);

const App = () => (
  <Provider store={store}>
      <ConnectedCounter />
  </Provider>
);

export default App;
