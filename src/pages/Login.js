import React, { Component } from "react";
import { connect } from 'react-redux'
// import { loginUser } from '../redux/userRedux/user/userActions'
import { loginUser } from '../redux'
// import logo from '../assets/logo.svg';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

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

     } else {
      Swal.fire({
        title: 'Error!',
        text: 'Please fill in the information before submitting.',
        icon: 'error',
        confirmButtonText: 'Okay'
      })
    }


  }

  render() {
    const { username, password } = this.state;

    return (
      <div className="rowcenter">
        <div className="col-6">
        <form  onSubmit={this.handleFormSubmit}>

          <div className="logintile margin-lr-10">
            <Link to=""><button type="button" className="buttonBack">←</button></Link>
            <h2 className="force-center">Login</h2>
            <br/>
            <input
                className="logintextbox"
                align="center"
                onChange={this.handleInputChange}
                type="text"
                name="username"
                value={username}
                maxLength="15"
                placeholder="Username"
                autoFocus
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
            </div>
            <div className="force-center">
              <Link to="/register" className="margin-tb-10"><p>Don't have an account? <u>Sign up</u></p></Link>
            </div>
          </div>

          </form>
        </div>
      </div>
      
    );
  }
}

export default connect(null, {loginUser})(Login);