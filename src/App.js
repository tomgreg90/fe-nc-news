import React from "react";
import "./App.css";
import { Router } from "@reach/router";
import Header from "./components/Header";
import Articles from "./components/Articles";
import ChosenArticle from "./components/ChosenArticle";
import Comments from "./components/Comments";

function App() {
  return (
    <div>
      <div>
        <Header />
        <Router>
          <Articles path="/articles" />
          <Articles path="/articles/:topic" />

          <ChosenArticle path="/articlesById/:article_id" />
          <Comments path="/articlesById/:article_id/comments" />
        </Router>
      </div>
    </div>
  );
}

export default App;
