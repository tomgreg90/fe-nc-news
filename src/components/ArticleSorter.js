import React, { Component } from "react";

export default class ArticleSorter extends Component {
  state = {
    sort_by: null,
    order: null
  };

  render() {
    return (
      <div>
        <label>
          Sort Articles By{" "}
          <select
            id="articleForm"
            onChange={event => {
              console.log(event.target.value);
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
          <form>
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
            <label>ascending</label>
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
            <label>descending</label>
          </form>
        </label>
      </div>
    );
  }
}
