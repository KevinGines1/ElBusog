import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import FoodPlace from './foodPlace';

class FoodPlaceMain extends Component {
  /*
  state = {
    foodPlaces: []
  }

  async componentDidMount() {
    const {data: foodPlaces} = await api.getAllFoodPlaces;
    this.setState({foodPlaces: foodPlaces.data});
  }
  */
  render() {
    //const { foodPlaces } = this.state;
    return (
      <div>
        <h1>foodPlaceMain</h1>

        <Link to = '/foodplaces/:postId'>foodPlace</Link>
      </div>
    );
  }
}

export default FoodPlaceMain;
