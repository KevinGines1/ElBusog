import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './Home.css';
import homeBanner from '../assets/uplbBanner.jpg';
import recomBanner from '../assets/cakeBanner.png';
import defaultFoodPic from '../assets/foodPlace.png';
import LoadingPage from './LoadingPage';
import Ratings from 'react-ratings-declarative';

function Home() {
    const foodPlacesData = useSelector(state => state.zeit.foodPlacesData)
    const foodPlaces = foodPlacesData.foodPlaces
    console.log("HERE ARE THE: ", foodPlaces)
    const foodTiles =[]
    foodPlaces.map(foodPlace =>
        foodTiles.push(
            <div key={foodPlace.Food_place_id} className="col-3 tile margin-lr-10 foodTile">
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
                <Link className="button margin-tb-10 viewDetails" to="/">View Details</Link>
            </div>
        )
    )

    return !foodPlaces[0] ? (
        <LoadingPage />
    ) : (
            <div style={{ backgroundImage: `url(${recomBanner})` }}>
                <div>
                    <div className="row">
                        <div className="col-12">
                            <img className="banner" src={homeBanner} alt="Welcome Banner" />
                            <h1 className="title">Find food places around Elbi</h1>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <div className="banner" style={{ width: "100%", height: "min(40vw, 350px)" }}></div>
                            <h2 className="title">Our Recommendations</h2>
                        </div>
                    </div>
                    <div className="rowcenter margin-tb-40">
                        {foodTiles}
                    </div>
                    <div className="rowcenter">
                        <Link className="button margin-tb-20 seeMore" to="/foodPlaces">
                            See More Food Places
                        </Link>
                    </div>
                </div>
            </div>
        );
}

export default Home;