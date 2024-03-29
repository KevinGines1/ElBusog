import React from 'react';
import { useSelector } from 'react-redux';
import LoadingPage from './LoadingPage';
import EditProfile from '../components/EditProfile';
import Dashboard from '../components/Dashboard';
import MyProfile from '../components/MyProfile';
import profileBG from '../assets/uplbBanner.jpg';
import './Profile.css';

function Profile() {
    const background = {
        backgroundImage: `url(${profileBG})`
    }
    const profile = useSelector(state => state.user)

    return profile.isLoggedIn && profile.User_type !== "" ? (
        <div className="profileBackground" style={background}>
            <div className="row"></div>
            <div className="rowcenter profile">
                {(!profile.editingProfile &&
                    <MyProfile />
                )}

                {(profile.editingProfile &&
                    <EditProfile />
                )}

                {(profile.User_type === "Customer" &&
                    <div className="col-7">
                        <div className="tile margin-lr-10 margin-tb-10 profileTiles customerDashboard">
                            <h3>Dashboard</h3>
                            <p className="dashboardMsg">Please switch to a Business Owner account to add a business</p>
                        </div>
                    </div>
                )}

                {(profile.User_type === "Business_owner" &&
                    <Dashboard />
                )}

            </div>
        </div>
    ) : !profile.isLoggedIn ? (
        <div className="profileBackground" style={background}>
            <div className="row"></div>
            <div className="rowcenter profile">
                <div className="col-5">
                    <div className="margin-lr-10 profileTiles notLoggedIn">
                        <h6>Log in or sign up to view your profile.</h6>
                    </div>
                </div>
            </div>
        </div>
    ) : (
                <LoadingPage />
            )
}

export default Profile;