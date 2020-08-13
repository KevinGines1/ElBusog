import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import banner from '../assets/uplbBanner.jpg';
// UNCOMMENT IF YOU WILL USE FoodPlace
// import FoodPlace from './FoodPlace';

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
        <div style={{backgroundImage: `url(${banner})`}}>
            <div className="row">
                <div className="col-12">
                    <img className="banner" src={banner} alt="Welcome Banner" />
                    <h1 className="title">Food Places</h1>
                </div>
            </div>
        </div>

        <Link to = '/foodplace/:postId'>foodPlace</Link>
      </div>
    );
  }
}

export default FoodPlaceMain;
