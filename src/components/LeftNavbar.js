import React from 'react';
import { Link } from 'react-router-dom';
import '../components/LeftNavbar.css'

const ProfileDropdown = () => (
    <div className="left-navbar">
        <Link to="/">
            <div className="left-navbar-entry">
                Home
            </div>
        </Link>
        <Link to="/foodplace">
            <div className="left-navbar-entry">
                Browse
            </div>
        </Link>
        <Link to="/about">
            <div className="left-navbar-entry">
                About
            </div>
        </Link>
    </div>
)

export default ProfileDropdown;