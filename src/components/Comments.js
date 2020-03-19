import React, { Component } from "react";
import { fetchComments, postComment, deleteComment } from "../api";
import "./Comments.css";
import TopicSelect from "./TopicSelect";
import PostComment from "./PostComment";

export default class Comments extends Component {
  state = {
    comments: [],
    hasError: false,
    error: null,

    cannotDeleteComment: null
  };
  render() {
    return (
      <div>
        <TopicSelect />
        <PostComment
          loginInfo={this.props.loginInfo}
          article_id={this.props.article_id}
          createNewComment={this.createNewComment}
        />
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
                <button
                  onClick={() => {
                    this.removeComment(comment.comment_id, comment.author);
                  }}
                >
                  Delete Comment
                </button>
                {this.state.cannotDeleteComment === comment.comment_id && (
                  <h5 className="cannotDelete">
                    Cannot delete comments by other users!!
                  </h5>
                )}
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
  createNewComment = (article, comment, user) => {
    postComment(article, comment, user)
      .then(comment => {
        this.setState(currentState => {
          return { comments: [comment, ...currentState.comments] };
        });
      })
      .catch(err => {
        this.setState({ hasError: true, error: err.response });
      });
  };
  removeComment = (comment_id, user) => {
    if (user === this.props.loginInfo.loggedInAs) {
      deleteComment(comment_id)
        .then(() => {
          this.setState(currentState => {
            return {
              comments: currentState.comments.filter(comment => {
                return comment.comment_id !== comment_id;
              })
            };
          });
        })
        .catch(err => {
          console.log(err);
          this.setState({ hasError: true, error: err.response });
        });
    } else {
      this.setState({ cannotDeleteComment: comment_id });
    }
  };
}
