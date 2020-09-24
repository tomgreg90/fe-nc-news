import React, { Component } from "react";
import "./PostComment.css";

export default class PostComment extends Component {
  state = { postComment: false, body: "" };

  render() {
    if (!this.state.postComment) {
      return (
        <h3 className="possibleComment">
          Click{" "}
          <button
            onClick={() => {
              this.setState({ postComment: true });
            }}
          >
            Here
          </button>{" "}
          to post a Comment!
        </h3>
      );
    }

    return (
      <div className="comment">
        {this.props.loggedInAs ? (
          <div>
            <h5 className="commentPost">
              Posting Comment as: {this.props.loggedInAs}
            </h5>

            <form onSubmit={this.handleSubmit}>
              <input
                className="commentBody"
                type="text"
                required
                onChange={event => {
                  this.handleChange(event.target.value);
                }}
                value={this.state.body}
              />
              <input
                type="submit"
                value="Submit Comment"
                className="submitComment"
              />
            </form>
          </div>
        ) : (
          <h5>Ooops! You must first login! </h5>
        )}
      </div>
    );
  }
  handleChange = body => {
    this.setState({ body });
  };
  handleSubmit = event => {
    event.preventDefault();

    this.props.createNewComment(
      this.props.article_id,
      this.state.body,
      this.props.loggedInAs
    );
    this.setState({ body: "" });
  };
}
