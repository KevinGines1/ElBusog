import React, { Component } from "react";
import { connect } from 'react-redux'
// import { loginUser } from '../redux/userRedux/user/userActions'
import { loginUser } from '../redux'
// import logo from '../assets/logo.svg';
import { Link } from 'react-router-dom';

const INITIAL_STATE = {
  username: '',
  password: ''
};

class Login extends Component {
  state = INITIAL_STATE;

  handleInputChange = (event) => {
    const { target } = event;
    this.setState({ [target.name]: target.value });
  };

  handleFormSubmit = (event) => {
    event.preventDefault();

    if (this.state.username && this.state.password) {

      const { username, password } = this.state;

      //call action creator
      this.props.loginUser({ username, password });
      
      //clear user input
      this.setState({
        username:'',
        password:''
      })
    } else {
      alert("Please fill in the following.")
    }


  }

  render() {
    const { username, password } = this.state;

    return (
      <form  onSubmit={this.handleFormSubmit}>

        <div className="logintile">
          <Link to=""><button className="buttonBack">←</button></Link>
          <h2 className="force-center">Login</h2>
          <br/>
          <input
              className="logintextbox"
              align="center"
              onChange={this.handleInputChange}
              type="text"
              name="username"
              value={username}
              placeholder="Username"
            /><br/><br/>
          <input
          className="logintextbox"
            align="center"
            onChange={this.handleInputChange}
            type="password"
            name="password"
            value={password}
            placeholder="Password"
          />  
          <br/><br/>

        <div className="force-center" >
          <button type="submit" className="button">Login</button>
          <div className="padding-lr-10"></div>
          <Link to="/register"><button className="button ">Sign Up</button></Link>
        </div>
      </div>
      
      </form>
    );
  }
}

export default connect(null, {loginUser})(Login);