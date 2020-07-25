import React, { Component } from 'react';
import profileBG from '../ElbusogCSS/uplbBanner.jpg';
import profilePic from '../ElbusogCSS/user.png';
import './profile.css';

// add component for edit profile

class Profile extends Component {
    render() {
        const state = {
            profilePic: profilePic,
            name: "John Doe",
            username: "@johndoe",
            email: "johndoe@gmail.com"
        }
        const background = {
            backgroundImage: `url(${profileBG})`
        }

        return (
            <div style={background}>
                <div className="rowcenter">
                    <div className="col-4 tile margin-lr-10 margin-tb-10 profileTiles">
                        <h3>Your Profile</h3>
                        <img
                            src={state.profilePic}
                            alt="Profile Picture"
                            className="profilePic" />
                        <h5 className="userName">{state.name}</h5>
                        <hr />
                        <p className="margin-t-10 italic">{state.username}</p>
                        <p className="margin-t-10">{state.email}</p>
                        <button className="editProfile">Edit Profile</button>
                    </div>
                    <div className="col-7 tile margin-lr-10 margin-tb-10 profileTiles">
                        <h3>Dashboard</h3>
                        <button className="margin-t-10 addBusiness">+ Add a business</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default Profile;