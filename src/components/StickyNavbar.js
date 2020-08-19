import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import logo from '../assets/logo.svg';
import burger from '../assets/burger.png';
import defaultPic from '../assets/user.png';
import ProfileDropdown from '../components/ProfileDropdown';
import LeftNavbar from '../components/LeftNavbar';

function StickyNavbar(props) {
    var prevScrollY = 0
    const [top, toggleStickyNavbar] = useState("-80px");
    const profilePic = useSelector(state => state.aaron.user.userInfo.Picture);
    const [leftNavbarVisible, toggleLeftNavbar] = useState(false);
    const [profileDropdownVisible, toggleDropdown] = useState(false);


    //to avoid React Hook useEffect has a missing dependency: 'handleScroll' warning
    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [])

    const handleScroll = () => {
        const currentScrollY = window.scrollY;
        
        //hide sticky navbar when scrolling down or when user is at the top where there is a fixed navbar
        if(currentScrollY > prevScrollY || currentScrollY < 300) {
            toggleStickyNavbar('-110px');
        }
        else {
            toggleStickyNavbar('0px');
        }
        toggleDropdown(false);
        toggleLeftNavbar(false);
        prevScrollY = currentScrollY;
    }

    return (
        <div>
            {(props.profilePic !== "" &&
                <div className="stickyNavbar" style={{top: `${top}`}}>
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

export default StickyNavbar;
