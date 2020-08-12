import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './Nav.css';
import logo from '../assets/logo.png';
import defaultPic from '../assets/user.png';

function Nav() {
    const profilePic = useSelector(state => state.profile.Picture)
    return (
        <div>
            {(profilePic !== "" &&
                <div className="fixedNavbar">
                    <img className="navbarLogo" src={logo} alt="Elbusog" />
                    <Link to="/">
                        Home
                    </Link>
                    <Link to="/foodplaces">
                        Browse
                    </Link>
                    <Link to="/">
                        About
                    </Link>
                    <div className="userHover">
                        <Link to="/profile">
                            <img
                                className="userThumb"
                                src={profilePic ? profilePic : defaultPic}
                                alt="User" />
                        </Link>
                    </div>
                </div>
            )}
            {/* <div className="stickyNavbar">
            <img className="navbarLogo" src={logo} alt="Elbusog" />
            <ul>
            <Link to="/">
                        <ls>Home</ls>
                        </Link>
                        <Link to="/foodplaces">
                        <ls>Browse</ls>
                        </Link>
                        <Link>
                        <ls>About</ls>
                        </Link>
                        </ul>
                        <div className="userHover">
                    <Link to="/profile">
                        <img className="userThumb" src={profilePic} alt="User" />
                    </Link>
                    </div>
                </div> */}
        </div>
    )
}

export default Nav;