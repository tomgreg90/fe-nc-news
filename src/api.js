import axios from "axios";

export const fetchComments = article_id => {
  console.log("fetching comments");
  return axios
    .get(
      `https://tomgreg-nc-news.herokuapp.com/api/articles/${article_id}/comments`
    )
    .then(({ data }) => {
      return data;
    });
};

export const fetchArticles = (topic, sort_by, order) => {
  return axios
    .get("https://tomgreg-nc-news.herokuapp.com/api/articles", {
      params: { topic, sort_by, order }
    })
    .then(({ data }) => {
      return data.articles;
    });
};
