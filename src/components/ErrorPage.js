import React from "react";
import "./ErrorPage.css";
import { Link } from "@reach/router";

export default function ErrorPage(props) {
  let message = "could not load Page!!";
  if (props.error.data.msg) message = props.error.data.msg;
  return (
    <div>
      <h3>
        Error {props.error.status}, {message}
      </h3>

      <h3>
        Click <Link to="/">Here</Link> to return to articles
      </h3>
    </div>
  );
}
