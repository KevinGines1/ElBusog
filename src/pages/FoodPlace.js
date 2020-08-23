import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Ratings from 'react-ratings-declarative';
import JeepneyRoute from '../components/JeepneyRoute';
import FoodPlaceMap from '../components/FoodPlaceMap';
import LoadingPage from './LoadingPage';
import Rate from '../components/Rate';
import banner from '../assets/uplbBanner.jpg';
// import defaultFoodPic from '../assets/foodPlace.png';

function FoodPlace({ match }) {
  const foodPlacesData = useSelector(state => state.zeit.foodPlacesData);
  const foodPlaces = foodPlacesData.listOfFoodPlaces;
  const foodPlace = foodPlaces.filter(foodPlace => foodPlace.Food_place_name === match.params.foodPlaceName);
  const [placeClosed, setPlaceClosed] = useState(false)

  var date = new Date();
  var day = date.getDay();                                // day of the week (0-6 is Sunday-Saturday)
  var hour = date.getHours() * 100 + date.getMinutes()    // hour in 24-hour format (0-23)
  if(foodPlace[0]) {
    console.log(foodPlace[0])
    if((hour < foodPlace[0].Opening_time || hour > foodPlace[0].Closing_time || !foodPlace[0].Days_open.includes(day)) && foodPlace[0].Opening_time && !placeClosed) {
      console.log(hour > foodPlace[0].Closing_time, hour,foodPlace[0].Closing_time, foodPlace[0].Opening_time)
      setPlaceClosed(true)
    }
  }
  

  return !foodPlace[0]
	?	<LoadingPage />
	:	(
    <div>
      <div style={{backgroundImage: `url(${banner})`}}>
          <div className="row">
              <div className="col-12">
                  <img className="banner" src={banner} alt="Welcome Banner" />
                  <h1 className="title">Food Places</h1>
              </div>
          </div>
      </div>
      <div class="rowcenter margin-tb-30">
        <div class="col-5">
            <img class="foodLargePic" src={foodPlace[0].Picture} alt={match.params.foodPlaceName}/>
        </div>
        <div class="col-5">
          <div class="margin-lr-20">
            <div class="row">
              <h4>{match.params.foodPlaceName}</h4>
              {placeClosed &&
                <p style={{color: 'red'}}><strong>CLOSED AT THIS TIME</strong></p>
              }
            </div>
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
            <div class="row">
                <p><strong>Price: </strong>{foodPlace[0].Price_range}</p>
            </div>
            <div class="row">
                <p><strong>Location: </strong>{foodPlace[0].Location}</p>
            </div>
            <div class="row">
                <p><strong>Food: </strong>{foodPlace[0].Food_types}</p>
            </div>
            <div class="row margin-tb-10">
                <p>{foodPlace[0].Description}</p>
            </div>
          </div>
        </div>
          
      </div>
      <Rate />
      <JeepneyRoute Food_place_id={foodPlace[0].Food_place_id}/>
      <FoodPlaceMap latitude={foodPlace[0].Latitude} longitude={foodPlace[0].Longitude}/>
    </div>
  );
}

export default FoodPlace;
