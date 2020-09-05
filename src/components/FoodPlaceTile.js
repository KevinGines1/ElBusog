import React from 'react'
import { Link } from 'react-router-dom';
import Ratings from 'react-ratings-declarative';
import defaultFoodPic from '../assets/foodPlace.png';

const FoodPlaceTile = (props) => (
        <div className="col-3 tile foodTile">
            <img className="foodIcon" src={props.Picture ? props.Picture : defaultFoodPic} alt="Food place" />
            <Link to={`/foodplace/${props.Food_place_name}`}><h4>{props.Food_place_name}</h4></Link>
            <Ratings
                rating={props.Rating}
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
            <p className="priceRange">Price Range: {props.Price_range} PHP</p>
            <p className="foodTypes">{props.Food_types}</p>
            <Link className="button margin-tb-10 viewDetails" to={`/foodplace/${props.Food_place_name}`}>View Details</Link>
        </div>
)

export default FoodPlaceTile;