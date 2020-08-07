import React, { Component } from "react";
import { connect } from 'react-redux'
import { addUser } from '../redux/user/userActions'

const INITIAL_STATE = {
  Name: '',
  Username: '',
  Email: '',
  Password: '',
  Picture: '',
  User_type: '',
};

class CreateAccount extends Component {
  state = INITIAL_STATE;

  handleInputChange = (event) => {
    const { target } = event;
    this.setState({ [target.name]: target.value });
  };

  handleFormSubmit = (event) => {
    event.preventDefault();

    if (this.state.Name && this.state.Username && this.state.Email && this.state.Password && this.state.Picture && this.state.User_type) {
      console.log(this.state)
      const {Name, Username, Email, Password, Picture, User_type } = this.state;

      //call action creator
      this.props.addUser({ Name, Username, Email, Password, Picture, User_type });

      //clear user input
      this.setState({
        Name: '',
        Username: '',
        Email: '',
        Password: '',
        Picture: '',
        User_type: '',
      })
    } else {
      alert("Please fill in the information before submitting!");
    }
    
  }

  render() {
    const { Name, Username, Email, Password, Picture, User_type } = this.state;

    return (
      <form onSubmit={this.handleFormSubmit}>
        <h1 className="LOGIN">Create Account</h1>
        <label>Name: </label>
        <input
          onChange={this.handleInputChange}
          type="text"
          name="Name"
          value={Name}
          placeholder="Name"
        />
        <br/><br/>
        <label>Username: </label>
        <input
          onChange={this.handleInputChange}
          type="text"
          name="Username"
          value={Username}
          placeholder="Username"
        />
        <br/><br/>
        <label>Email: </label>
        <input
          onChange={this.handleInputChange}
          type="email"
          name="Email"
          value={Email}
          placeholder="Email"
        />
        <br/><br/>
        <label>Password: </label>
        <input
          onChange={this.handleInputChange}
          type="password"
          name="Password"
          value={Password}
          placeholder="Password"
        />
        <br/><br/>
        <label>Picture: </label>
        <input
          onChange={this.handleInputChange}
          type="text"
          name="Picture"
          value={Picture}
          placeholder="Enter image URL"
        />
        <div><br/>
          <label>Account Type</label><br/>
          <input
            onChange={this.handleInputChange}
            type="radio"
            name="User_type"
            id="business"
            value="Business_owner"
          />
          <label for="business">Business</label>
          <br/>
          <input
            onChange={this.handleInputChange}
            type="radio"
            name="User_type"
            id="customer"
            value="Customer"
          />
          <label for="customer">Customer</label>
        </div>

        <br/><br/>
        <button type="submit" className="buttonz">Create Account</button>
      </form>
    );
  }
}

export default connect(null, {addUser})(CreateAccount);
