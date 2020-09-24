import React, { Component } from "react";
import axios from "axios";

import "./ChosenArticle.css";
import ErrorPage from "./ErrorPage";
import { Link } from "@reach/router";
import LoadingPage from "./LoadingPage";

import VotingError from "./VotingError";
import Voter from "./Voter";

export default class ChosenArticle extends Component {
  state = {
    article: {},
    articleError: null,
    isLoading: true,
  };

  render() {
    const { article } = this.state;

    return (
      <div>
        {this.state.isLoading ? (
          <LoadingPage />
        ) : this.state.articleError ? (
          <ErrorPage error={this.state.articleErrors} />
        ) : (
          <article className="article">
            <h3 className="title">{article.title}</h3>

            <h5>By {article.author}</h5>
            <h5>Created at {article.created_at}</h5>
            <p className="body">{article.body}</p>

            {this.state.votingError && (
              <VotingError removeMessage={this.removeMessage} />
            )}
            <Voter
              section="articles"
              voteNum={article.votes}
              item="article"
              id={article.article_id}
            />
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
        const { article } = data;
        this.setState({ article, hasError: false, isLoading: false });
      })
      .catch((err) => {
        this.setState({
          articleError: err.response,
          isLoading: false,
        });
      });
  }

  removeMessage = () => {
    this.setState({ votingError: false });
  };
}
