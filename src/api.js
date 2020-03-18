import axios from "axios";

export const fetchComments = () => {
  console.log("fetching comments");
  return axios
    .get("https://tomgreg-nc-news.herokuapp.com/api/articles/2/comments")
    .then(({ data }) => {
      console.log(data);
      return data;
    });
};
