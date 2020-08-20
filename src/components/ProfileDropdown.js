import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { logoutUser, logoutProfile } from '../redux';
import '../components/ProfileDropdown.css'

function ProfileDropdown() {
    const dispatch = useDispatch()

    const logout = () => {
        dispatch(logoutUser())
        dispatch(logoutProfile())
    }

    var profileName = useSelector(state => state.zeit.profile.Name);

    return(
        <div className="profile-dropdown">
            {profileName
            ?   <div>
                    <Link to="/profile">
                        <div className="profile-dropdown-entry">
                            My Account
                        </div>
                    </Link>
                    <Link to="/" onClick={() => logout()}>
                        <div className="profile-dropdown-entry">
                            Logout
                        </div>
                    </Link>
                </div>
            :   <div>
                    <Link to="/login">
                        <div className="profile-dropdown-entry">
                            Log in
                        </div>
                    </Link>
                    <Link to="/register">
                        <div className="profile-dropdown-entry">
                            Sign Up
                        </div>
                    </Link>
                </div>
            }
        </div>
    )
}

export default ProfileDropdown;