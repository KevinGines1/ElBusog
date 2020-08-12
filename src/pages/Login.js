import React, { Component } from "react";
import { connect } from 'react-redux'
// import { loginUser } from '../redux/userRedux/user/userActions'
import { loginUser } from '../redux'

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
      console.log(this.state)
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
      <form onSubmit={this.handleFormSubmit}>
        <h1 className="LOGIN">Login</h1>
        <label>Username: </label>
        <input
          align="center"
          onChange={this.handleInputChange}
          type="text"
          name="username"
          value={username}
          placeholder="Username"
        /><br/><br/>
        <label>Password: </label>
        <input
          align="center"
          onChange={this.handleInputChange}
          type="password"
          name="password"
          value={password}
          placeholder="Password"
        /><br/><br/>
        <button type="submit" className="buttonz">Login</button>
      </form>
    );
  }
}

export default connect(null, {loginUser})(Login);