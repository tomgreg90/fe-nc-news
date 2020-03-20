import React, { Component } from "react";
import "./LoginForm.css";

export default class LoginForm extends Component {
  state = { userInput: null };

  render() {
    if (this.props.isLoggedIn)
      return (
        <h3 className="loginName">Logged in as: {this.props.loggedInAs}</h3>
      );
    return (
      <label>
        Login Here!
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            onChange={event => {
              this.handleChange(event.target.value);
            }}
          />
          <input type="submit" value="Login" />
        </form>
      </label>
    );
  }
  handleChange = user => {
    this.setState({ userInput: user });
  };
  handleSubmit = event => {
    event.preventDefault();
    this.props.createNewUser(this.state.userInput);
  };
}
