import React from "react";
import "./ErrorPage.css";
import { Link } from "@reach/router";

export default function ErrorPage(props) {
  const message = "Error, page does not exist!!";

  if (props.error) {
    return (
      <div>
        <h3>
          Error {props.error.status}, {props.error.data.message}
        </h3>

        <h3>
          Click <Link to="/">Here</Link> to return to home!
        </h3>
      </div>
    );
  } else
    return (
      <div>
        <h3>{message}</h3>

        <h3>
          Click <Link to="/">Here</Link> to return to home!
        </h3>
      </div>
    );
}
