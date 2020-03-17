import React, { Component } from "react";
import "./TopicSelect.css";
import { Link } from "@reach/router";

export default class TopicSelect extends Component {
  render() {
    return (
      <div>
        <h5>Select a topic:</h5>
        <Link to="/articles">
          <h5>All</h5>
        </Link>
        <Link to="/articles/coding">
          <h5>coding</h5>
        </Link>
        <Link to="/articles/football">
          <h5>fooball</h5>
        </Link>
        <Link to="/articles/cooking">
          <h5>cooking</h5>
        </Link>
      </div>
    );
  }
}
