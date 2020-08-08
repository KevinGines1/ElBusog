import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { editProfile, addingFoodPlace, editingFoodPlace } from '../redux';
import LoadingPage from '../LoadingPage';
import EditProfile from './EditProfile';
import AddFoodPlace from './AddFoodPlace';
import defaultPic from '../ElbusogCSS/user.png';
import profileBG from '../ElbusogCSS/uplbBanner.jpg';
import './Profile.css';

function Profile() {
    const background = {
        backgroundImage: `url(${profileBG})`
    }
    const profile = useSelector(state => state.profile)
    const ownedFoodPlaces = profile.ownedFoodPlaces
    const dispatch = useDispatch()

    return (profile.User_type === "Business_owner" && ownedFoodPlaces[0]) || profile.User_type === "Customer" ? (
        <div style={background}>
            <div className="rowcenter">
                {(!profile.isEditing &&
                    <div className="col-4 tile margin-lr-10 margin-tb-10 profileTiles">
                        <h3>My Profile</h3>
                        <div className="profilePicContainer">
                            <img
                                src={profile.Picture ? profile.Picture : defaultPic}
                                alt="Profile"
                                className="profilePic" />
                        </div>
                        <h5 className="name">{profile.Name}</h5>
                        <p className="userType italic">
                            {profile.User_type === "Customer"
                                ? "Customer"
                                : "Business Owner"}
                        </p>
                        <hr className="dottedDivider" />
                        <p className="username">@{profile.Username}</p>
                        <p className="email">{profile.Email}</p>
                        <button
                            className="editProfileBtn"
                            disabled={profile.addingFoodPlace || profile.editingFoodPlace}
                            onClick={() => dispatch(editProfile())}>Edit Profile</button>
                    </div>
                )}

                {(profile.isEditing &&
                    <EditProfile />
                )}
                {(profile.User_type === "Customer" &&
                    <div className="col-7 tile margin-lr-10 margin-tb-10 profileTiles customerDashboard">
                        <h3>Dashboard</h3>
                        <p className="dashboardMsg">Please switch to a Business Owner account to add a business</p>
                    </div>
                )}

                {(profile.User_type === "Business_owner" &&
                    <div className="col-7 tile margin-lr-10 margin-tb-10 profileTiles businessOwnerDashboard">
                        <h3>Dashboard</h3>
                        {ownedFoodPlaces.map(foodPlace => (
                            <div key={foodPlace.Food_place_id} className="dashboardItem">
                                {(profile.editingData.Food_place_id === foodPlace.Food_place_id &&
                                    <AddFoodPlace />
                                )}
                                {(profile.editingData.Food_place_id !== foodPlace.Food_place_id &&
                                    <div>
                                        <h5>{foodPlace.Food_place_name}</h5>
                                        <p>Rating:
                                            {/* {foodPlace.Rating} */}
                                        </p>
                                        <p> Comments:
                                            {/* {foodPlace.Comments} */}
                                        </p>
                                        <button
                                            className="editProfileBtn"
                                            disabled={profile.addingFoodPlace || profile.isEditing}
                                            onClick={() => dispatch(editingFoodPlace(foodPlace))}
                                        >Edit</button>
                                    </div>
                                )}
                            </div>
                        ))}
                        {(profile.addingFoodPlace &&
                            <div className="dashboardItem">
                                <AddFoodPlace />
                            </div>
                        )}
                        {(!profile.addingFoodPlace &&
                            <button
                                className="editProfileBtn"
                                disabled={profile.addingFoodPlace || profile.isEditing || profile.editingFoodPlace}
                                onClick={() => dispatch(addingFoodPlace())}
                            >Add a Food Place</button>
                        )}
                    </div>
                )}
            </div>
        </div>
    ) : (
            <LoadingPage />
        )
}

export default Profile;