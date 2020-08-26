import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import FoodPlaceTile from '../components/FoodPlaceTile';
import './Home.css';
import homeBanner from '../assets/uplbBanner.jpg';
import recomBanner from '../assets/cakeBanner.png';
import LoadingPage from './LoadingPage';
import Randomizer from '../components/Randomizer';

function Home() {
    const foodPlacesData = useSelector(state => state.zeit.foodPlacesData)
    const foodPlaces = foodPlacesData.foodPlaces
    const foodTiles = []
    foodPlaces.map(foodPlace =>
        foodTiles.push(
            <FoodPlaceTile
                key={foodPlace.Food_place_id}
                Picture={foodPlace.Picture}
                Food_place_name={foodPlace.Food_place_name}
                Rating={foodPlace.Rating}
                Price_range={foodPlace.Price_range}
                Food_types={foodPlace.Food_types}
            />
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
                    <Randomizer />
                    <div className="row">
                        <div className="col-12">
                            <div className="banner" style={{ width: "100%", height: "min(40vw, 300px)" }}></div>
                            <h2 className="title">Our Recommendations</h2>
                        </div>
                    </div>
                    <div className="rowcenter margin-tb-30 foodTilesContainer">
                        {foodTiles}
                    </div>
                    <div className="row force-center">
                        <Link className="button margin-tb-20 seeMore" to="/foodplace">
                            See More Food Places
                        </Link>
                    </div>
                </div>
            </div>
        );
}

export default Home;
