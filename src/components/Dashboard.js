import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addingFoodPlace } from '../redux';
import AddEditFoodPlace from '../components/AddEditFoodPlace';
import DashboardItemButtons from './DashboardItemButtons';
import foodIcon from '../assets/foodIcon.png';
import Ratings from 'react-ratings-declarative';

function Dashboard() {    
    const profile = useSelector(state => state.zeit.profile)
    const dispatch = useDispatch()
    const ownedFoodPlaces = profile.ownedFoodPlaces

    return (
        <div className="col-7">
            <div className=" tile margin-lr-10 margin-tb-10 profileTiles businessOwnerDashboard">
                <h3>Dashboard</h3>
                {ownedFoodPlaces.map(foodPlace => (
                    <div key={foodPlace.Food_place_name} className="dashboardItemContainer">
                        {(profile.editingData.Food_place_id === foodPlace.Food_place_id &&
                            <AddEditFoodPlace />
                        )}
                        {(profile.editingData.Food_place_id !== foodPlace.Food_place_id &&
                            <div className="dashboardItem">
                                <div className="foodPlaceDetails">
                                    <div className="foodPlacePic">
                                        <img
                                            src={foodPlace.Picture === null ? foodIcon : foodPlace.Picture}
                                            alt="FoodPlace"
                                        />
                                    </div>
                                    <div className="foodPlaceTitle">{foodPlace.Food_place_name}</div>
                                    {(isNaN(foodPlace.Rating) &&
                                        <p className="rating">No Rating</p>
                                    )}
                                    {(!isNaN(foodPlace.Rating) &&
                                        <Ratings 
                                            rating = {foodPlace.Rating}
                                            widgetDimensions="15px"
                                            widgetEmptyColors="#a6a6a6"
                                            widgetRatedColors="rgb(242, 242, 242, 0.9)"
                                            widgetSpacings="1px"
                                        >
                                            <Ratings.Widget />
                                            <Ratings.Widget />
                                            <Ratings.Widget />
                                            <Ratings.Widget />
                                            <Ratings.Widget />
                                        </Ratings>
                                    )}
                                    {/* FOR STAR RATING: https://github.com/ekeric13/react-ratings-declarative */}

                                    <DashboardItemButtons foodPlace={foodPlace} />

                                </div>
                                <div className="allCommentsContainer">
                                    <div className="commentsTitle"> Comments </div>
                                    <div className="scrollingComments">
                                        {foodPlace.Reviews.length !== 0 &&
                                        foodPlace.Reviews.map(review => (
                                            <div key={review.Comment} className="commentContainer">
                                            <Ratings 
                                                rating = {review.Rating}
                                                widgetDimensions="12px"
                                                widgetEmptyColors="#737373"
                                                widgetRatedColors="#e07f3e"
                                                widgetSpacings="0.5px"
                                            >
                                                <Ratings.Widget />
                                                <Ratings.Widget />
                                                <Ratings.Widget />
                                                <Ratings.Widget />
                                                <Ratings.Widget />
                                            </Ratings>
                                                <p className="datePosted">{review.Date_posted.slice(0, 10)}</p>
                                                <p className="comment">{review.Comment}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                            </div>
                        )}
                    </div>
                ))}
                {(profile.addingFoodPlace &&
                    <div className="dashboardItemContainer">
                        <AddEditFoodPlace />
                    </div>
                )}
                {(!profile.addingFoodPlace &&
                    <button
                        className="profileBtn"
                        disabled={profile.addingFoodPlace || profile.isEditing || profile.editingFoodPlace}
                        onClick={() => dispatch(addingFoodPlace())}
                    >Add a Food Place</button>
                )}
            </div>
        </div>
    );
}

export default Dashboard;