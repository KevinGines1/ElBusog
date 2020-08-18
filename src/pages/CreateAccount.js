import React, { Component } from "react";
import { connect } from 'react-redux'
// import { addUser } from '../redux/userRedux/user/userActions'
import { test, checkEmail } from '../redux'
import { Link } from 'react-router-dom';

const INITIAL_STATE = {
  Name: '',
  Username: '',
  Email: '',
  Password: '',
  Picture: '',
  User_type: '',
};

const mapDispatchToProps = dispatch => {
  return {
    test : (username) =>dispatch(test(username))
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

    console.log("inForms")
    console.log(this.state.Username)
    const theEmail = this.state.Email
    const theUsername = this.state.Username
    console.log(typeof(this.props.test))
    console.log(this.props.test)
    this.props.test(theUsername)
    //this.props.checkEmail(theEmail)

    // if (this.state.Name && this.state.Username && this.state.Email && this.state.Password && this.state.Picture && this.state.User_type) {
    //   console.log(this.state)
    //   const {Name, Username, Email, Password, Picture, User_type } = this.state;

    //   //call action creator
    //   this.props.addUser({ Name, Username, Email, Password, Picture, User_type });

    //   //clear user input
    //   this.setState({
    //     Name: '',
    //     Username: '',
    //     Email: '',
    //     Password: '',
    //     Picture: '',
    //     User_type: '',
    //   })
    // } else {
    //   alert("Please fill in the information before submitting!");
    // }
    
  }

  render() {
    const { Name, Username, Email, Password, Picture } = this.state;  // removed User_type because it is not used (aug. 11)

    return (
      <form onSubmit={this.handleFormSubmit}>
        <div className="logintile">
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
          <input
            className="logintextbox"
            onChange={this.handleInputChange}
            type="text"
            name="Picture"
            value={Picture}
            placeholder="Enter image URL"
          /><br/><br/>
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
            <div className="padding-lr-10"></div>
          <Link to="/login"><button className="button ">Sign In</button></Link>
        </div>
        </div>
      </form>
    );
  }
}

export default connect(null, mapDispatchToProps)(CreateAccount);