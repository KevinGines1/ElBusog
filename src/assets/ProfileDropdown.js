import React from 'react';
import { Link } from 'react-router-dom';
import '../components/ProfileDropdown.css'

const ProfileDropdown = () => (
    <div className="profile-dropdown">
        <div className="profile-dropdown-entry"><Link to="/profile">
            My Account
        </Link></div>
        <div className="profile-dropdown-entry"><Link to="/">
            Logout
        </Link></div>
    </div>
)

export default ProfileDropdown;