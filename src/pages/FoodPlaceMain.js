import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import LoadingPage from './LoadingPage';
import banner from '../assets/uplbBanner.jpg';
import defaultFoodPic from '../assets/foodPlace.png';
import Ratings from 'react-ratings-declarative';


function FoodPlaceMain() {
  const foodPlacesData = useSelector(state => state.zeit.foodPlacesData);
  const foodPlaces = foodPlacesData.listOfFoodPlaces;
  const foodTiles =[]
  foodPlaces.map(foodPlace =>
      foodTiles.push(
          <div key={foodPlace.Food_place_id} className="col-3">
              <div className="tile foodTile margin-lr-10 margin-tb-10">
                  <img className="foodIcon" src={foodPlace.Picture ? foodPlace.Picture : defaultFoodPic} alt="Food place" />
                  <h4>{foodPlace.Food_place_name}</h4>
                  <Ratings
                      rating = {foodPlace.Rating}
                      widgetDimensions="18px"
                      widgetEmptyColors="#b3b3b3"
                      widgetRatedColors="#e07f3e"
                      widgetSpacings="1.5px"
                  >
                      <Ratings.Widget />
                      <Ratings.Widget />
                      <Ratings.Widget />
                      <Ratings.Widget />
                      <Ratings.Widget />
                  </Ratings>
                  <p className="priceRange">Price Range: {foodPlace.Price_range}</p>
                  <p className="foodTypes">{foodPlace.Food_types}</p>
                  <Link className="button margin-tb-10 viewDetails" to = {`/foodplace/${foodPlace.Food_place_name}`}>View Details</Link>
              </div>
          </div>
      )
  )

  return !foodPlaces[0]
    ? <LoadingPage />
    : (
    <div>
      <div style={{ backgroundImage: `url(${banner})` }}>
          <div className="row">
              <div className="col-12">
                  <img className="banner" src={banner} alt="Welcome Banner" />
                  <h1 className="title">Food Places</h1>
              </div>
          </div>
      </div>
      <div className="rowcenter margin-tb-30">
          {foodTiles}
      </div>
    </div>
  );
}

export default FoodPlaceMain;
