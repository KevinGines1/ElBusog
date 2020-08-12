import React from 'react';
import { Link } from 'react-router-dom';
import '../components/LeftNavbar.css'

const ProfileDropdown = () => (
    <div className="left-navbar">
        <div className="left-navbar-entry"><Link to="/">
            Home
        </Link></div>
        <div className="left-navbar-entry"><Link to="/food">
            Food
        </Link></div>
        <div className="left-navbar-entry"><Link to="/about">
            About
        </Link></div>
    </div>
)

export default ProfileDropdown;