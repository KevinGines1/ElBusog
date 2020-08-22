import React from 'react';
import { useSelector } from 'react-redux';
import JeepneyRoute from '../components/JeepneyRoute';
import FoodPlaceMap from '../components/FoodPlaceMap'
import Rate from '../components/Rate';
import banner from '../assets/uplbBanner.jpg';
// import defaultFoodPic from '../assets/foodPlace.png';

function FoodPlace({ match }) {
  const foodPlacesData = useSelector(state => state.zeit.foodPlacesData);
  const foodPlaces = foodPlacesData.listOfFoodPlaces;
  const foodPlace = foodPlaces.filter(foodPlace => foodPlace.Food_place_name === match.params.foodPlaceName);
  // const foodPlaceName = foodPlace[0];

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
      <h3>{match.params.foodPlaceName}</h3>
      <Rate />
      <JeepneyRoute Food_place_id={foodPlace[0].Food_place_id}/>
      <FoodPlaceMap latitude={foodPlace[0].Latitude} longitude={foodPlace[0].Longitude}/>
      {/* {console.log(foodPlace[0])} */}
    </div>
  );
}

export default FoodPlace;
