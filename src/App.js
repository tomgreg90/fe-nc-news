import "./App.css";
import { Router } from "@reach/router";
import Header from "./components/Header";
import Articles from "./components/Articles";
import ChosenArticle from "./components/ChosenArticle";
import Comments from "./components/Comments";
import LoginForm from "./components/LoginForm";

import React, { Component } from "react";

export default class App extends Component {
  state = {
    isLoggedIn: true,
    loggedInAs: "jessjelly"
  };

  render() {
    return (
      <div>
        <Header />
        <LoginForm
          createNewUser={this.createNewUser}
          isLoggedIn={this.state.isLoggedIn}
          loggedInAs={this.state.loggedInAs}
        />
        <Router>
          <Articles path="/articles" />
          <Articles path="/articles/:topic" />

          <ChosenArticle path="/articlesById/:article_id" />
          <Comments
            loginInfo={this.state}
            path="/articlesById/:article_id/comments"
          />
        </Router>
      </div>
    );
  }
  createNewUser = user => {
    this.setState({ isLoggedIn: true, loggedInAs: user });
  };
}
