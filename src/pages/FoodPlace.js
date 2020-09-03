import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Ratings from 'react-ratings-declarative';
import JeepneyRoute from '../components/JeepneyRoute';
import FoodPlaceMap from '../components/FoodPlaceMap';
import LoadingPage from './LoadingPage';
import Comment from '../components/Comment'
import banner from '../assets/uplbBanner.jpg';
import defaultFoodPic from '../assets/foodPlace.png';
import Rate from '../components/Rate'
// import defaultFoodPic from '../assets/foodPlace.png';

function FoodPlace({ match }) {
  const foodPlacesData = useSelector(state => state.zeit.foodPlacesData);
  const foodPlaces = foodPlacesData.listOfFoodPlaces;
  const foodPlace = foodPlaces.filter(foodPlace => foodPlace.Food_place_name === match.params.foodPlaceName);
  var placeClosed = false
  var nextOpenWhen = ""
  var openTimeSentence = ""

  var date = new Date();
  var day = date.getDay();                                // day of the week (0-6 is Sunday-Saturday)
  var hour = date.getHours() * 100 + date.getMinutes()    // hour in 24-hour format (0-23)

  if(foodPlace[0]) {
    var openHourText = ""
    var closeHourText = ""
    //convert data to understandable text
    if(foodPlace[0].Opening_time) {
      openHourText = foodPlace[0].Opening_time.slice(0, -2) + ":" + foodPlace[0].Opening_time.slice(-2)
      closeHourText = foodPlace[0].Closing_time.slice(0, -2) + ":" + foodPlace[0].Closing_time.slice(-2)
    }
    var openWeekDays = ""
    if(foodPlace[0].Days_open.includes(0)) {
      openWeekDays += "Su "
    }
    if(foodPlace[0].Days_open.includes(1)) {
      openWeekDays += "M "
    }
    if(foodPlace[0].Days_open.includes(2)) {
      openWeekDays += "T "
    }
    if(foodPlace[0].Days_open.includes(3)) {
      openWeekDays += "W "
    }
    if(foodPlace[0].Days_open.includes(4)) {
      openWeekDays += "Th "
    }
    if(foodPlace[0].Days_open.includes(5)) {
      openWeekDays += "F "
    }
    if(foodPlace[0].Days_open.includes(6)) {
      openWeekDays += "Sa"
    }
    //check if food place is closed
    if((hour < foodPlace[0].Opening_time || hour > foodPlace[0].Closing_time || !foodPlace[0].Days_open.includes(day)) && foodPlace[0].Opening_time && !placeClosed) {
      placeClosed = true
      //check when food place will open next
      if(hour < foodPlace[0].Opening_time && foodPlace[0].Days_open.includes(day)) {
        nextOpenWhen = `Opens later at ${openHourText}`
      }
      else if((foodPlace[0].Days_open.includes((day+1)%7))) {
        nextOpenWhen = `Opens tomorrow at ${openHourText}`
      }
    }
    if(!foodPlace[0].Opening_time && foodPlace[0].Days_open === "0123456") {
      openTimeSentence = "Open 24/7"
    }
    else if(foodPlace[0].Opening_time && foodPlace[0].Days_open === "0123456") {
      openTimeSentence = `Open everyday from ${openHourText} to ${closeHourText}`
    }
    else if(!foodPlace[0].Opening_time && foodPlace[0].Days_open !== "0123456") {
      openTimeSentence = `Open 24 hours (${openWeekDays})`
    }
    else if(foodPlace[0].Opening_time && foodPlace[0].Days_open !== "0123456") {
      openTimeSentence = `Open from ${openHourText} to ${closeHourText} (${openWeekDays})`
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
      <div className="rowcenter margin-tb-30">
        <div className="col-5">
          <img className="foodLargePic" src={foodPlace[0].Picture ? foodPlace[0].Picture : defaultFoodPic} alt={match.params.foodPlaceName}/>
        </div>
        <div className="col-5">
          <div className="margin-lr-20">
            <div className="row">
              <h4>{foodPlace[0].Food_place_name}</h4>
              {placeClosed &&
                <div>
                  <p style={{color: 'red'}}><strong>CLOSED AT THIS TIME</strong></p>
                  <p>{nextOpenWhen}</p>
                </div>
              }
            </div>
            <Ratings
									rating = {foodPlace[0].Rating}
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
            <div className="row">
                <p><strong>Price: </strong>{foodPlace[0].Price_range}</p>
            </div>
            <div className="row">
                <p><strong>Location: </strong>{foodPlace[0].Location}</p>
            </div>
            <div className="row">
                <p><strong>Food: </strong>{foodPlace[0].Food_types}</p>
            </div>
            <div className="row margin-tb-10">
                <p>{openTimeSentence}</p>
            </div>
            <div className="row margin-tb-10">
                <p>{foodPlace[0].Description}</p>
            </div>
          </div>
        </div>

      </div>
      <JeepneyRoute Food_place_id={foodPlace[0].Food_place_id}/>
      <FoodPlaceMap latitude={foodPlace[0].Latitude} longitude={foodPlace[0].Longitude}/>
      <div className="rowcenter">
        <div className="col-6">
          <div className="margin-lr-10 tile">
            <h4>Rate this food place!</h4><br/>
              <Comment foodPlaceID = {foodPlace[0].Food_place_id} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default FoodPlace;
