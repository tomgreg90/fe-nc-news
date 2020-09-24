import "./App.css";
import { Router } from "@reach/router";
import Header from "./components/Header";
import Articles from "./components/Articles";
import ChosenArticle from "./components/ChosenArticle";
import Comments from "./components/Comments";
import LoginForm from "./components/LoginForm";
import NavBar from "./components/NavBar";
import ErrorPage from "./components/ErrorPage";
import React, { Component } from "react";

export default class App extends Component {
  state = {
    loggedInAs: "jessjelly"
  };

  render() {
    return (
      <div className="myApp">
        <Header />
        <LoginForm
          createNewUser={this.createNewUser}
          loggedInAs={this.state.loggedInAs}
        />
        <NavBar />

        <Router>
          <Articles path="/" />
          <Articles path="/articles/:topic" />

          <ChosenArticle path="/articlesById/:article_id" />
          <Comments
            loggedInAs={this.state.loggedInAs}
            path="/articlesById/:article_id/comments"
          />
          <ErrorPage default error={null} />
        </Router>
      </div>
    );
  }
  createNewUser = user => {
    this.setState({ loggedInAs: user });
  };
}
