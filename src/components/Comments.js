import React, { Component } from "react";
import { fetchComments, postComment, deleteComment } from "../api";
import "./Comments.css";
import TopicSelect from "./TopicSelect";
import PostComment from "./PostComment";
import { increaseVotes } from "../api";
import VotingError from "./VotingError";
import ErrorPage from "./ErrorPage";

export default class Comments extends Component {
  state = {
    comments: [],
    hasError: false,
    error: null,
    votingError: false,
    cannotDeleteComment: null,
    errorComment: null,
    deleteError: false
  };
  render() {
    return (
      <div>
        <TopicSelect />
        {this.state.deleteError ? (
          <ErrorPage error={this.state.error} />
        ) : (
          <div>
            <PostComment
              loginInfo={this.props.loginInfo}
              article_id={this.props.article_id}
              createNewComment={this.createNewComment}
            />
            :{" "}
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

                    <div>
                      <h5>
                        Vote for this comment?{" "}
                        <button
                          onClick={() => {
                            this.upVoteComment(comment.comment_id);
                          }}
                        >
                          Yes
                        </button>
                      </h5>
                    </div>
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
          console.dir(err);
          this.setState({ deleteError: true, error: err.response });
        });
    } else {
      this.setState({ cannotDeleteComment: comment_id });
    }
  };

  upVoteComment = id => {
    let commentIndex;
    for (let i = 0; i < this.state.comments.length; i++) {
      if (this.state.comments[i].comment_id === id) {
        commentIndex = i;
      }
    }
    increaseVotes(id, "comments").catch(err => {
      this.setState({ votingError: true, errorComment: id });
      this.setState(prevState => {
        prevState.comments[commentIndex].votes -= 1;
        return { comments: prevState.comments };
      });
    });
    this.setState({ votingError: false });
    this.setState(prevState => {
      prevState.comments[commentIndex].votes += 1;
      return { comments: prevState.comments };
    });
  };

  removeMessage = () => {
    this.setState({ votingError: false });
  };
}
