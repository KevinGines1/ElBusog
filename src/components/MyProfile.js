import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import defaultPic from '../assets/user.png';
import { editProfile } from '../redux';

function MyProfile() {
    const profile = useSelector(state => state.zeit.profile)
    const dispatch = useDispatch()

    return (
        <div className="col-4">
            <div className="tile margin-lr-10 margin-tb-10 profileTiles">
                <h3>My Profile</h3>
                <div className="myProfilePic">
                    <img
                        src={profile.Picture ? profile.Picture : defaultPic}
                        alt="Profile"
                    />
                </div>
                <h6 className="name">{profile.Name}</h6>
                <p className="userType italic">
                    {profile.User_type === "Customer"
                        ? "Customer"
                        : "Business Owner"}
                </p>
                <hr className="dottedDivider" />
                <p className="username">@{profile.Username}</p>
                <p className="email">{profile.Email}</p>
                <button
                    className="profileBtn"
                    disabled={profile.addingFoodPlace || profile.editingFoodPlace}
                    onClick={() => dispatch(editProfile())}>Edit Profile</button>
            </div>
        </div>
    );
}

export default MyProfile;