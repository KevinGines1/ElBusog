import React from 'react';
import { Link } from 'react-router-dom';
import './nav.css';
import '../ElbusogCSS/ElbusogCSS.css';
import logo from '../ElbusogCSS/logo.png';
import userPic from '../ElbusogCSS/user.png';

function Nav() {
    return (
        <div className="fixedNavbar">
            <img className="navbarLogo" src={logo} alt="Elbusog" />
            <ul>
                <Link to="/">
                    <ls>Home</ls>
                </Link>
                <Link>
                    <ls>Food</ls>
                </Link>
                <Link>
                    <ls>About</ls>
                </Link>
            </ul>
            <div className="userHover">
                <Link to="/profile">
                    <img className="userThumb" src={userPic} alt="Name" />
                </Link>
            </div>
            {/* <img className="userThumb" src={userPic} alt="Name" /> */}
        </div>
    )
}

export default Nav;