import React, { Component } from "react";
import { fetchComments } from "../api";
import "./Comments.css";
import TopicSelect from "./TopicSelect";

export default class Comments extends Component {
  state = { comments: [] };
  render() {
    return (
      <div>
        <TopicSelect />
        <ul>
          {this.state.comments.map(comment => {
            return (
              <li key={comment.comment_id}>
                <h3 className="commentBy">By: {comment.author}</h3>
                <h5 className="commentData">Votes: {comment.votes}</h5>
                <h5 className="commentData">
                  Created at: {comment.created_at}
                </h5>
                <p>{comment.body}</p>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
  componentDidMount() {
    fetchComments(this.props.article_id).then(({ comments }) => {
      this.setState({ comments });
    });
  }
}
