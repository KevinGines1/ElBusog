import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import logo from '../assets/logo.svg';
import burger from '../assets/burger.png';
import defaultPic from '../assets/user.png';
import ProfileDropdown from '../components/ProfileDropdown';
import LeftNavbar from '../components/LeftNavbar';

function Navbar(props) {
    var profilePic = useSelector(state => state.aaron.user.userInfo.Picture);
    const [leftNavbarVisible, toggleLeftNavbar] = useState(false);
    const [profileDropdownVisible, toggleDropdown] = useState(false);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        }, [])

    const handleScroll = () => {
        toggleDropdown(false);
        toggleLeftNavbar(false);
    }
    return (
        <div>
            {(props.profilePic !== "" &&
                <div className="fixedNavbar">
                    <div>
                        <img
                            className="burger" 
                            src={burger} 
                            alt="More options"
                            onClick={() => {toggleLeftNavbar(!leftNavbarVisible); toggleDropdown(false)}}
                        />
                        <img className="navbarLogo" src={logo} alt="Elbusog" />
                    </div>
                    <div>
                        <Link to="/">
                            Home
                        </Link>
                        <Link to="/foodplace">
                            Browse
                        </Link>
                        <Link to="/about">
                            About
                        </Link>
                    </div>
                    <div className="userHover">
                        <img
                            className="userThumb"
                            onClick={() => {toggleDropdown(!profileDropdownVisible); toggleLeftNavbar(false)}}
                            src={profilePic ? profilePic : defaultPic}
                            alt="User" />
                    </div>
                </div>
            )}
            <div onClick={() => toggleDropdown(false)}>
                {profileDropdownVisible &&
                    <ProfileDropdown/>
                }
            </div>
            <div onClick={() => toggleLeftNavbar(false)}>
                {leftNavbarVisible &&
                    <LeftNavbar/>
                }
            </div>
        </div>
    )
}

export default Navbar;
