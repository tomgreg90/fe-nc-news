import React, { Component } from "react";
import "./NavBar.css";
import { Link } from "@reach/router";

export default class TopicSelect extends Component {
  render() {
    return (
      <nav>
        <div className="splitNav">
          <Link to="/">
            <h5>Home</h5>
          </Link>
          <Link to="/articles/coding">
            <h5>coding</h5>
          </Link>
        </div>
        <div className="splitNav">
          <Link to="/articles/football">
            <h5>fooball</h5>
          </Link>
          <Link to="/articles/cooking">
            <h5>cooking</h5>
          </Link>
        </div>
      </nav>
    );
  }
}
