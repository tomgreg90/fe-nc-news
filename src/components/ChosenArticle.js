import React, { Component } from "react";
import axios from "axios";
import TopicSelect from "./TopicSelect";
import "./ChosenArticle.css";
import ErrorPage from "./ErrorPage";
import { Link } from "@reach/router";

export default class ChosenArticle extends Component {
  state = {
    article: {},
    hasError: false,
    error: null
  };

  render() {
    const { article } = this.state;
    return (
      <div>
        <TopicSelect />
        {this.state.hasError ? (
          <ErrorPage error={this.state.error} />
        ) : (
          <article className="myArticle">
            <h3 className="title">{article.title}</h3>
            <h5>By {article.author}</h5>
            <h5>Created at {article.created_at}</h5>
            <p className="body">{article.body}</p>
            <h5>Comment count: {article.comment_count}</h5>
            <h5>
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
        console.log(data);
        const article = data.article;
        this.setState({ article, hasError: false });
      })
      .catch(err => {
        this.setState({ hasError: true, error: err.response });
      });
  }
}
