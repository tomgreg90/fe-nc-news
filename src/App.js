import React from "react";
import "./App.css";
import { Router } from "@reach/router";
import Header from "./components/Header";
import Articles from "./components/Articles";

function App() {
  return (
    <div>
      <Header />
      <Router>
        <Articles path="/articles" />
        <Articles path="/articles/:topic" />
      </Router>
    </div>
  );
}

export default App;
