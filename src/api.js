import axios from "axios";

export const fetchComments = article_id => {
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

export const postComment = (article_id, comment, user) => {
  return axios
    .post(
      `https://tomgreg-nc-news.herokuapp.com/api/articles/${article_id}/comments`,
      { username: user, body: comment }
    )
    .then(response => {
      return response.data.comment;
    });
};

export const deleteComment = id => {
  return axios.delete(
    `https://tomgreg-nc-news.herokuapp.com/api/comments/${id}`
  );
};

export const increaseVotes = (id, section, amount) => {
  return axios
    .patch(`https://tomgreg-nc-news.herokuapp.com/api/${section}/${id}`, {
      inc_votes: amount
    })
    .then(({ data }) => {
      return data;
    });
};
