import React, { Component } from "react";
import { fetchComments, postComment, deleteComment } from "../api";
import "./Comments.css";
import LoadingPage from "./LoadingPage";
import PostComment from "./PostComment";
import { increaseVotes } from "../api";
import VotingError from "./VotingError";
import ErrorPage from "./ErrorPage";
import Voter from "./Voter";

export default class Comments extends Component {
  state = {
    comments: [],
    error: null,
    votingError: false,
    cannotDeleteComment: null,
    errorComment: null,
    isLoading: false
  };
  render() {
    return (
      <div>
        {this.state.isLoading ? (
          <LoadingPage />
        ) : this.state.error ? (
          <ErrorPage error={this.state.error} />
        ) : (
          <div>
            <PostComment
              loggedInAs={this.props.loggedInAs}
              article_id={this.props.article_id}
              createNewComment={this.createNewComment}
            />{" "}
            <ul>
              {this.state.comments.map((comment, index) => {
                return (
                  <li key={comment.comment_id} className="myComment">
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

                    <Voter
                      item="comment"
                      id={comment.comment_id}
                      index={index}
                      updateVotes={this.updateVotes}
                    />
                    {this.state.votingError &&
                      this.state.errorComment === comment.comment_id && (
                        <VotingError removeMessage={this.removeMessage} />
                      )}
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </div>
    );
  }
  componentDidMount() {
    fetchComments(this.props.article_id)
      .then(({ comments }) => {
        this.setState({ comments });
      })
      .catch(err => {
        this.setState({ error: err.response });
      });
  }
  createNewComment = (article, comment, user) => {
    postComment(article, comment, user)
      .then(newComment => {
        this.setState(currentState => {
          return {
            comments: [newComment, ...currentState.comments],
            isLoading: false
          };
        });
      })
      .catch(err => {
        this.setState({ error: err.response, isLoading: false });
      });

    this.setState({ isLoading: true });
  };

  removeComment = (comment_id, commentAuthor) => {
    if (commentAuthor === this.props.loggedInAs) {
      deleteComment(comment_id).catch(err => {
        this.setState({ error: err.response });
        this.setState(prevState => {
          return {
            comments: [...prevState.comments]
          };
        });
      });

      this.setState(currentState => {
        return {
          comments: currentState.comments.filter(comment => {
            return comment.comment_id !== comment_id;
          })
        };
      });
    } else {
      this.setState({ cannotDeleteComment: comment_id });
    }
  };

  updateVotes = (id, amount, commentIndex) => {
    increaseVotes(id, "comments", amount).catch(err => {
      this.setState({ votingError: true, errorComment: id });
      this.setState(prevState => {
        prevState.comments[commentIndex].votes -= 1;
        return { comments: prevState.comments };
      });
    });

    this.setState({ votingError: false });
    this.setState(prevState => {
      prevState.comments[commentIndex].votes += amount;
      return { comments: prevState.comments };
    });
  };

  removeMessage = () => {
    this.setState({ votingError: false });
  };
}
