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
	// const foodTiles = []

	//group the food places first into groups of 4
	var foodTilesGrouped = foodPlaces.reduce((resultArray, item, index) => {
		const chunkIndex = Math.floor(index / 4)

		if (!resultArray[chunkIndex]) {
			resultArray[chunkIndex] = [] // start a new chunk
		}

		resultArray[chunkIndex].push(item)

		return resultArray
	}, [])

	return !foodPlaces[0]
		? <LoadingPage />
		: (
			<div className="foodPlaceMain">
				<div style={{ backgroundImage: `url(${banner})` }}>
					<div className="row">
						<div className="col-12">
							<img className="banner" src={banner} alt="Welcome Banner" />
							<h1 className="title">Food Places</h1>
						</div>
					</div>
				</div>

				{foodTilesGrouped.map((foodPlaceGroup, index) => {
					return (
						<div key={index} className="rowcenter foodTilesContainer">
							{foodPlaceGroup.map(foodPlace =>
								<div key={foodPlace.Food_place_id} className="col-3 tile foodTile">
									<img className="foodIcon" src={foodPlace.Picture ? foodPlace.Picture : defaultFoodPic} alt="Food place" />
									<h4>{foodPlace.Food_place_name}</h4>
									<Ratings
										rating={foodPlace.Rating}
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
									<Link className="button margin-tb-10 viewDetails" to={`/foodplace/${foodPlace.Food_place_name}`}>View Details</Link>
								</div>
							)}
						</div>
					)
				})}
			</div>
		);
}

export default FoodPlaceMain;
