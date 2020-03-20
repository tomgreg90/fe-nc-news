import React from "react";
import "./VotingError.css";

export default function VotingError(props) {
  return (
    <div className="message">
      <h4>Woops!! There was an Error</h4>

      <button
        className="button"
        onClick={() => {
          props.removeMessage();
        }}
      >
        ok
      </button>
    </div>
  );
}
