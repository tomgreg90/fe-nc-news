import React, { Component } from "react";
import axios from "axios";
import "./Articles.css";
import TopicSelect from "./TopicSelect";
import { Link } from "@reach/router";

export default class Articles extends Component {
  state = {
    articles: []
  };

  render() {
    console.log(this.state.articles);
    return (
      <div>
        <TopicSelect addQuery={this.addQuery} />
        <ul>
          {this.state.articles.map(article => {
            return (
              <li key={article.article_id}>
                <Link to={`/articles/${article.article_id}`}>
                  {" "}
                  <p>{article.title}</p>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }

  componentDidMount() {
    axios
      .get("https://tomgreg-nc-news.herokuapp.com/api/articles")
      .then(({ data }) => {
        const articles = data.articles;
        this.setState({ articles });
      });
  }
  componentDidUpdate(prevProps) {
    console.log("inside cdu");
    if (this.props.topic !== prevProps.topic) {
      axios
        .get(
          `https://tomgreg-nc-news.herokuapp.com/api/articles?topic=${this.props.topic}`
        )
        .then(({ data }) => {
          console.log(data);
          const articles = data.articles;
          this.setState({ articles });
        });
    }
  }
}
