import React, { Component } from "react";
import "./ArticleSorter.css";

export default class ArticleSorter extends Component {
  state = {
    sort_by: null,
    order: null
  };

  render() {
    return (
      <form className="articleSorter">
        <label className="label">Sort Articles By </label>
        <select
          className="dropdown"
          id="articleForm"
          onChange={event => {
            this.setState({ sort_by: event.target.value });
            this.props.fetchSortedArticles(
              this.props.topic,
              event.target.value,
              null
            );
          }}
        >
          <option value="votes">Votes</option>
          <option value="comment_count">Comment Count</option>
          <option value="created_at">Date Created</option>
        </select>

        <label className="radio">
          <input
            type="radio"
            value="asc"
            name="order"
            id="asc"
            onChange={event => {
              this.setState({ order: event.target.value });
              this.props.fetchSortedArticles(
                this.props.topic,
                this.state.sort_by,
                event.target.value
              );
            }}
          />
          ascending
        </label>
        <label className="radio">
          <input
            type="radio"
            name="order"
            value="desc"
            id="desc"
            onChange={event => {
              this.setState({ order: event.target.value });
              this.props.fetchSortedArticles(
                this.props.topic,
                this.state.sort_by,
                event.target.value
              );
            }}
          />
          descending
        </label>
      </form>
    );
  }
}
