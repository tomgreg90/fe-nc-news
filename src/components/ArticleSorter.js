import React from "react";

export default function ArticleSorter(props) {
  return (
    <label>
      Sort Articles By{" "}
      <select
        id="articleForm"
        onChange={event => {
          props.fetchSortedArticles(props.topic, event.target.value);
        }}
      >
        <option value="votes">Votes</option>
        <option value="comment_count">Comment Count</option>
        <option value="created_at">Date Created</option>
      </select>
    </label>
  );
}
