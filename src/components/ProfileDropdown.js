import React from 'react';
import { Link } from 'react-router-dom';
import '../components/ProfileDropdown.css'

const ProfileDropdown = () => (
    <div className="profile-dropdown">
        <Link to="/profile">
            <div className="profile-dropdown-entry">
                My Account
            </div>
        </Link>
        <Link to="/">
            <div className="profile-dropdown-entry">
                Logout
            </div>
        </Link>
    </div>
)

export default ProfileDropdown;