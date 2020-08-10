import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import '../ElbusogCSS/ElbusogCSS.css';
import './Home.css';
import homeBanner from '../ElbusogCSS/uplbBanner.jpg';
import recomBanner from '../ElbusogCSS/cakeBanner.png';
import defaultFoodPic from '../ElbusogCSS/foodPlace.png';
import LoadingPage from '../LoadingPage';

function Home() {
    const foodPlacesData = useSelector(state => state.foodPlacesData)
    const foodPlaces = foodPlacesData.foodPlaces

    // not sure if the loading and error message will work

    // return foodPlacesData.loading ? (
    //     <h5>Loading</h5>
    // ) : foodPlacesData.error ? (
    //     <h5>{foodPlacesData.error}</h5>
    // ) : (
    return !foodPlaces[13] ? (
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
                            <div className="banner" style={{width: "100%", height: "min(40vw, 350px)"}}></div>
                            {/* <img className="banner" src={recomBanner} alt="Cake Banner" /> */}
                            <h2 className="title">Our Recommendations</h2>
                        </div>
                    </div>
                    <div className="rowcenter margin-tb-40">
                        <div className="col-3 tile margin-lr-10 foodTile">
                            <img className="foodIcon" src={foodPlaces[0].Picture ? foodPlaces[0].Picture : defaultFoodPic} alt="Name of food place" />
                            <h4>{foodPlaces[0].Food_place_name}</h4>
                            <p className="priceRange">Price Range: {foodPlaces[0].Price_range}</p>
                            <p className="foodTypes">{foodPlaces[0].Food_types}</p>
                            <Link className="button margin-tb-10 viewDetails" to="/">View Details</Link>
                        </div>
                        <div className="col-3 tile margin-lr-10 foodTile">
                            <img className="foodIcon" src={foodPlaces[1].Picture ? foodPlaces[1].Picture : defaultFoodPic} alt="Name of food place" />
                            <h4>{foodPlaces[1].Food_place_name}</h4>
                            <p className="priceRange">Price Range: {foodPlaces[1].Price_range}</p>
                            <p className="foodTypes">{foodPlaces[1].Food_types}</p>
                            <Link className="button margin-tb-10 viewDetails" to="/">View Details</Link>
                        </div>
                        <div className="col-3 tile margin-lr-10 foodTile">
                            <img className="foodIcon" src={foodPlaces[2].Picture ? foodPlaces[2].Picture : defaultFoodPic} alt="Name of food place" />
                            <h4>{foodPlaces[2].Food_place_name}</h4>
                            <p className="priceRange">Price Range: {foodPlaces[2].Price_range}</p>
                            <p className="foodTypes">{foodPlaces[2].Food_types}</p>
                            <Link className="button margin-tb-10 viewDetails" to="/">View Details</Link>
                        </div>
                        <div className="col-3 tile margin-lr-10 foodTile">
                            <img className="foodIcon" src={foodPlaces[3].Picture ? foodPlaces[3].Picture : defaultFoodPic} alt="Name of food place" />
                            <h4>{foodPlaces[3].Food_place_name}</h4>
                            <p className="priceRange">Price Range: {foodPlaces[3].Price_range}</p>
                            <p className="foodTypes">{foodPlaces[3].Food_types}</p>
                            <Link className="button margin-tb-10 viewDetails" to="/">View Details</Link>
                        </div>
                    </div>
                    <div className="rowcenter">
                        <Link className="button margin-tb-20 seeMore" to="/foodplaces">
                            See More Food Places
                        </Link>
                    </div>
                </div>
            </div>
        );
}

export default Home;