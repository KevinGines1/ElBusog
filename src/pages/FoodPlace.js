import React from 'react';
import { useSelector } from 'react-redux';
// import JeepneyRoute from '../components/JeepneyRoute';
// import FoodPlaceMap from '../components/FoodPlaceMap'
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
      {/* temporary disabled to lessen api calls, pass the real values later */}
      {/* <JeepneyRoute Food_place_id={5}/> */}
      {/* <FoodPlaceMap latitude={14.167418} longitude={121.243359}/> */}
      {console.log(foodPlace[0])}
    </div>
  );
}

export default FoodPlace;
