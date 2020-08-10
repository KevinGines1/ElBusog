import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';
import defaultPic from '../assets/user.png';
import ProfileDropdown from '../components/ProfileDropdown';
import { connect } from 'react-redux';

// const mapStateToProps = state => {
//     return{
//         profilePic: state.profile.Picture
//     }
// }

class StickyNavbar extends React.Component {
    state = {
        top: "-80px",
        prevScrollY: 0,
        profileDropdownVisible: false
    }

    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll);
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
    }

    toggleDropdown() {
        this.setState({profileDropdownVisible: !this.state.profileDropdownVisible})
    }

    handleScroll = () => {
        const { prevScrollY } = this.state;
        const currentScrollY = window.scrollY;
        
        //hide sticky navbar when scrolling down or when user is at the top where there is a fixed navbar
        if(currentScrollY > prevScrollY || currentScrollY < 300) {
            this.setState({top: '-110px'});
        }
        else {
            this.setState({top: '0px'});
        }
        this.setState({profileDropdownVisible: false})
        this.setState({prevScrollY: currentScrollY});
    }
    render() {
        // const profilePic = useSelector(state => state.profile.Picture)
        const profilePic = false
        return (
            <div>
                {(this.props.profilePic !== "" &&
                    <div className="stickyNavbar" style={{top: `${this.state.top}`}}>
                        <img className="navbarLogo" src={logo} alt="Elbusog" />
                        <div>
                            <Link to="/">
                                Home
                            </Link>
                            <Link to="/foodplaces">
                                Browse
                            </Link>
                            <Link to="/">
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
            </div>
        )
    }
}

export default StickyNavbar;
// export default connect (mapStateToProps)(StickyNavbar);