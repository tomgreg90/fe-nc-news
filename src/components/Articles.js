import React, { Component } from "react";
import axios from "axios";
import "./Articles.css";
import TopicSelect from "./TopicSelect";
import { Link } from "@reach/router";
import Loading from "./Loading";
import ErrorPage from "./ErrorPage";

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
    let url;
    if (!this.props.topic)
      url = "https://tomgreg-nc-news.herokuapp.com/api/articles";
    else {
      url = `https://tomgreg-nc-news.herokuapp.com/api/articles?topic=${this.props.topic}`;
    }

    axios
      .get(url)
      .then(({ data }) => {
        const articles = data.articles;
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
      axios
        .get(
          `https://tomgreg-nc-news.herokuapp.com/api/articles?topic=${this.props.topic}`
        )
        .then(({ data }) => {
          console.log(data);
          const articles = data.articles;
          this.setState({ articles, hasError: false });
        });
    }
  }
}
