import React, { Component } from "react";
import { connect } from 'react-redux'
// import { addUser } from '../redux/userRedux/user/userActions'
import { verifyUsername } from '../redux'
import { Link } from 'react-router-dom';
import defaultImg from '../assets/user.png'

const INITIAL_STATE = {
  Name: '',
  Username: '',
  Email: '',
  Password: '',
  Picture: defaultImg,
  User_type: '',
};

const mapDispatchToProps = dispatch => {
  return {
    // resetRegister : () =>dispatch(resetRegister()),
    verifyUsername : (username) =>dispatch(verifyUsername(username)),
    // verifyEmail : (email) =>dispatch(verifyEmail(email)),
    // addUser: (userObj) =>dispatch(addUser(userObj))
  }
}

class CreateAccount extends Component {
  state = INITIAL_STATE;

  handleInputChange = (event) => {
    const { target } = event;
    this.setState({ [target.name]: target.value });
  };

  handleFormSubmit = (event) => {
    event.preventDefault();

    if (this.state.Name && this.state.Username && this.state.Email && this.state.Password && this.state.Picture && this.state.User_type) {
      //console.log(this.state)
      const {Name, Username, Email, Password, Picture, User_type } = this.state;

      //call action creator
      this.props.verifyUsername({ Name, Username, Email, Password, Picture, User_type });

    } else {
      alert("Please fill in the information before submitting!");
    }
    
  }

  render() {
    const { Name, Username, Email, Password, Picture } = this.state;  // removed User_type because it is not used (aug. 11)

    return (
      <div className="rowcenter">
        <div className="col-8">
          <form onSubmit={this.handleFormSubmit}>
            <div className="logintile margin-lr-10">
              <Link to=""><button className="buttonBack">←</button></Link>
              <h2 className="force-center">Register</h2>
              <input
                className="logintextbox"
                onChange={this.handleInputChange}
                type="text"
                name="Name"
                value={Name}
                placeholder="Name"
              />
              <br/><br/>
              <input
                className="logintextbox"
                onChange={this.handleInputChange}
                type="text"
                name="Username"
                value={Username}
                placeholder="Username"
              />
              <br/><br/>
              <input
                className="logintextbox"
                onChange={this.handleInputChange}
                type="email"
                name="Email"
                value={Email}
                placeholder="Email"
              />
              <br/><br/>
              <input
                className="logintextbox"
                onChange={this.handleInputChange}
                type="password"
                name="Password"
                value={Password}
                placeholder="Password"
              />
              <br/><br/>
              <div className="rowcenter">
                <label className="col-3 margin-tb-10">Account Type:</label>

                {/* <div className="padding-lr-20"></div> */}
                  
                <label className="radContainer col-3 padding-lr-20 margin-tb-10">Business
                  <input 
                    onChange={this.handleInputChange}
                    type="radio" 
                    name="User_type"
                    id="business"
                    value="Business_owner"
                    />
                  <span className="radButton"></span>
                </label>

                {/* <div className="padding-lr-20"></div> */}

                <label className="radContainer col-3 padding-lr-20 margin-tb-10">Customer
                  <input 
                    onChange={this.handleInputChange}
                    type="radio" 
                    name="User_type"
                    id="customer"
                    value="Customer"
                    />
                  <span className="radButton"></span>
                </label>


              </div>

              <br/><br/>
              <div className="force-center" >
                <button type="submit" className="button ">Register</button>
              </div>
              <div className="force-center">
                <Link to="/login" className="margin-tb-10"><p>Already have an account? <u>Log in</u></p></Link>
              </div>
            
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default connect(null, mapDispatchToProps)(CreateAccount);
