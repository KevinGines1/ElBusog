import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addingFoodPlace } from '../redux';
import AddEditFoodPlace from '../components/AddEditFoodPlace';
import DashboardItemButtons from './DashboardItemButtons';

function Dashboard() {    
    const profile = useSelector(state => state.profile)
    const dispatch = useDispatch()
    const ownedFoodPlaces = profile.ownedFoodPlaces

    return (
        <div className="col-7 tile margin-lr-10 margin-tb-10 profileTiles businessOwnerDashboard">
            <h3>Dashboard</h3>
            {ownedFoodPlaces.map(foodPlace => (
                <div key={foodPlace.Food_place_id} className="dashboardItemContainer">
                    {(profile.editingData.Food_place_id === foodPlace.Food_place_id &&
                        <AddEditFoodPlace />
                    )}
                    {(profile.editingData.Food_place_id !== foodPlace.Food_place_id &&
                        <div className="dashboardItem">
                            <div className="foodPlaceDetails">
                                <div className="foodPlacePic">
                                    <img
                                        src={foodPlace.Picture}
                                        alt="FoodPlace"
                                    />
                                </div>
                                <div className="foodPlaceTitle">{foodPlace.Food_place_name}</div>
                                {(isNaN(foodPlace.Rating) &&
                                    <p>No Rating</p>
                                )}
                                {(!isNaN(foodPlace.Rating) &&
                                    <p>{foodPlace.Rating}</p>
                                )}
                                {/* FOR STAR RATING: https://www.npmjs.com/package/react-star-ratings */}

                                <DashboardItemButtons foodPlace={foodPlace} />

                            </div>
                            <div className="allCommentsContainer">
                                <div className="commentsTitle"> Comments </div>
                                <div className="scrollingComments">
                                    {foodPlace.Comments.length !== 0 &&
                                    foodPlace.Comments.map(comment => (
                                        <div key={comment.Comment} className="commentContainer">
                                            <p className="rating">{comment.Rating} stars</p>
                                            <p className="datePosted">{comment.Date_posted.slice(0, 10)}</p>
                                            <p className="comment">{comment.Comment}</p>
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
    );
}

export default Dashboard;