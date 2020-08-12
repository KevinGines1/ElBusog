import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';
import burger from '../assets/burger.png';
import defaultPic from '../assets/user.png';
import ProfileDropdown from '../components/ProfileDropdown';
import LeftNavbar from '../components/LeftNavbar';

// const mapStateToProps = state => {
//     return{
//         profilePic: state.profile.Picture
//     }
// }

//this can be optimized later, maybe change to a function
class StickyNavbar extends React.Component {
    state = {
        profileDropdownVisible: false,
        leftNavbarVisible: false
    }

    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll);
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
    }

    toggleDropdown() {
        this.setState({profileDropdownVisible: !this.state.profileDropdownVisible});
    }

    toggleLeftNavbar () {
        this.setState({leftNavbarVisible: !this.state.leftNavbarVisible});
    }

    handleScroll = () => {
        this.setState({
            profileDropdownVisible: false,
            leftNavbarVisible: false
        })
    }
    render() {
        // because i changed it from a function to a class,
        // we need to implement mapStateToProps instead of useSelector
        // i still dont know how profile.Picture works so i will leave it in false
        // const profilePic = useSelector(state => state.profile.Picture)
        const profilePic = false
        return (
            <div>
                {(this.props.profilePic !== "" &&
                    <div className="fixedNavbar">
                        <div>
                            <img
                                className="burger" 
                                src={burger} 
                                alt="More options"
                                onClick={() => this.toggleLeftNavbar()}
                            />
                            <img className="navbarLogo" src={logo} alt="Elbusog" />
                        </div>
                        <div>
                            <Link to="/">
                                Home
                            </Link>
                            <Link to="/foodplaces">
                                Browse
                            </Link>
                            <Link to="/about">
                                About
                            </Link>
                        </div>
                        <div className="userHover">
                            <img
                                className="userThumb"
                                onClick={() => this.toggleDropdown()}
                                src={profilePic ? profilePic : defaultPic}
                                alt="User" />
                        </div>
                    </div>
                )}
                {this.state.profileDropdownVisible &&
                    <ProfileDropdown/>
                }
                {this.state.leftNavbarVisible &&
                    <LeftNavbar/>
                }
            </div>
        )
    }
}

export default StickyNavbar;
// export default connect (mapStateToProps)(StickyNavbar);
