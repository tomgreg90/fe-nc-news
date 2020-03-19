import React, { Component } from "react";
import "./Articles.css";
import TopicSelect from "./TopicSelect";
import { Link } from "@reach/router";
import Loading from "./Loading";
import ErrorPage from "./ErrorPage";
import { fetchArticles } from "../api";
import ArticleSorter from "./ArticleSorter";

export default class Articles extends Component {
  state = {
    articles: [],
    isLoading: true,
    hasError: false,
    error: null
  };

  render() {
    return (
      <div>
        <TopicSelect />
        <ArticleSorter
          fetchSortedArticles={this.fetchSortedArticles}
          topic={this.props.topic}
        />
        {this.state.isLoading ? (
          <Loading />
        ) : this.state.hasError ? (
          <ErrorPage error={this.state.error} />
        ) : (
          <ul>
            {this.state.articles.map(article => {
              return (
                <li key={article.article_id}>
                  <Link to={`/articlesById/${article.article_id}`}>
                    {" "}
                    <p>{article.title}</p>
                  </Link>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    );
  }

  componentDidMount() {
    fetchArticles(this.props.topic)
      .then(articles => {
        this.setState({ articles, isLoading: false, hasError: false });
      })
      .catch(err => {
        this.setState({
          isLoading: false,
          hasError: true,
          error: err.response
        });
      });
  }
  componentDidUpdate(prevProps) {
    if (this.props.topic !== prevProps.topic) {
      fetchArticles(this.props.topic)
        .then(articles => {
          this.setState({ articles, hasError: false });
        })
        .catch(err => {
          this.setState({
            isLoading: false,
            hasError: true,
            error: err.response
          });
        });
    }
  }
  fetchSortedArticles = (topic, sort_by) => {
    fetchArticles(topic, sort_by).then(articles => {
      this.setState({ articles });
    });
  };
}
