import React from 'react';
import { useSelector } from 'react-redux';
import LoadingPage from './LoadingPage';
import FoodPlaceTile from '../components/FoodPlaceTile';
import banner from '../assets/uplbBanner.jpg';


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
								<FoodPlaceTile
									key={foodPlace.Food_place_id}
									Picture={foodPlace.Picture}
									Food_place_name={foodPlace.Food_place_name}
									Rating={foodPlace.Rating}
									Price_range={foodPlace.Price_range}
									Food_types={foodPlace.Food_types}
								/>
							)}
						</div>
					)
				})}
			</div>
		);
}

export default FoodPlaceMain;
