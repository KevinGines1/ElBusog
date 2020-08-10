import React, { setState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import defaultPic from '../ElbusogCSS/user.png';
import { editProfile } from '../redux';
import axios from 'axios';

function MyProfile() {
    const profile = useSelector(state => state.profile)
    const dispatch = useDispatch()

    return (
        <div className="col-4 tile margin-lr-10 margin-tb-10 profileTiles">
            <h3>My Profile</h3>
            <div className="myProfilePic">
                <img
                    src={profile.Picture ? profile.Picture : defaultPic}
                    alt="Profile"
                />
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
                className="profileBtn"
                disabled={profile.addingFoodPlace || profile.editingFoodPlace}
                onClick={() => dispatch(editProfile())}>Edit Profile</button>
        </div>
    );
}

export default MyProfile;