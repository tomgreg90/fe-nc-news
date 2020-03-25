import React, { Component } from "react";
import axios from "axios";

import "./ChosenArticle.css";
import ErrorPage from "./ErrorPage";
import { Link } from "@reach/router";
import LoadingPage from "./LoadingPage";
import { increaseVotes } from "../api";
import VotingError from "./VotingError";

export default class ChosenArticle extends Component {
  state = {
    article: {},
    hasError: false,
    error: null,
    isLoading: true,
    votingError: false
  };

  render() {
    const { article } = this.state;

    return (
      <div>
        {this.state.isLoading ? (
          <LoadingPage />
        ) : this.state.hasError ? (
          <ErrorPage error={this.state.error} />
        ) : (
          <article className="article">
            <h3 className="title">{article.title}</h3>

            <h5>By {article.author}</h5>
            <h5>Created at {article.created_at}</h5>
            <p className="body">{article.body}</p>
            <h5 className="votes">Votes: {article.votes}</h5>
            {this.state.votingError && (
              <VotingError removeMessage={this.removeMessage} />
            )}
            <h5 className="votes">Vote for this article?</h5>
            <button
              onClick={() => {
                this.upVoteArticle(article.article_id);
              }}
            >
              Yes
            </button>
            <h5 className="comments">Comment count: {article.comment_count}</h5>
            <h5 className="comments">
              Click{" "}
              <Link to={`/articlesById/${article.article_id}/comments`}>
                Here
              </Link>{" "}
              to see the comments!
            </h5>
          </article>
        )}
      </div>
    );
  }

  componentDidMount() {
    axios
      .get(
        `https://tomgreg-nc-news.herokuapp.com/api/articles/${this.props.article_id}`
      )
      .then(({ data }) => {
        const article = data.article;
        this.setState({ article, hasError: false, isLoading: false });
      })
      .catch(err => {
        this.setState({
          hasError: true,
          error: err.response,
          isLoading: false
        });
      });
  }

  upVoteArticle = id => {
    increaseVotes(id, "articles").catch(err => {
      this.setState({ votingError: true });
      this.setState(prevState => {
        prevState.article.votes -= 1;
        return { article: prevState.article };
      });
    });
    this.setState({ votingError: false });
    this.setState(prevState => {
      prevState.article.votes += 1;
      return { article: prevState.article };
    });
  };

  removeMessage = () => {
    this.setState({ votingError: false });
  };
}
