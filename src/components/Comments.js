import React, { Component } from "react";
import { fetchComments } from "../api";

export default class Comments extends Component {
  render() {
    return <div></div>;
  }
  componentDidMount() {
    fetchComments();
  }
}
