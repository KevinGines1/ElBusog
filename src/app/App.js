import React from 'react';
import Randomizer from '../components/Randomizer.js';
import { Provider, connect } from 'react-redux';
import { randomizeAction, getAllFoodPlaces } from '../redux';
import store from '../redux/store.js';
import './App.css';

const mapDispatchToProps = dispatch => ({
  randomize: (payload) => dispatch(randomizeAction(payload)),
  getallfoodplaces: (payload) => dispatch(getAllFoodPlaces(payload))
});

const mapStateToProps = state => {
  return{
    listOfFoodPlaces: state.listOfFoodPlaces,
    listOfFoodPlacesRanked: state.listOfFoodPlacesRanked
  }
}

// this temporary class is only needed for demo purposes,
// i need to show props so i made this.
// after merge, App.js will no longer need to use props and state
// so i can remove this Temp
class Temp extends React.Component {
  render() {
    return(
      <div>
        {this.props.listOfFoodPlacesRanked !== null &&
        <div>
        {/* <p>{this.props.listOfFoodPlaces.map(food => food.Food_place_name)}</p> */}
          <h2>{this.props.listOfFoodPlacesRanked[0].Food_place_name}</h2>
          <p>You might also like...</p>
          <h3>{this.props.listOfFoodPlacesRanked[1].Food_place_name}</h3>
          <p>Note: This is for demo purposes only and not to be displayed here in final product. After choices are made, rankings are stored
          in the store and user will be redirected to the food place page.</p>
        </div>
        }
      </div>
    )
  }
}

const ConnectedCounter = connect(mapStateToProps, mapDispatchToProps)(Temp);

const App = () => (
  <Provider store={store}>
    <ConnectedCounter />
    <Randomizer/>
  </Provider>
);

export default App;
