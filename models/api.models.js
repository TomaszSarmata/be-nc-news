const { error } = require("console");
const db = require("../db/connection.js");
const fs = require("fs/promises");

const fetchAllTopics = () => {
  return db
    .query(
      `
    SELECT * FROM topics
    `
    )
    .then((results) => {
      return results.rows;
    });
};

const fetchAllEndpoints = () => {
  return fs.readFile("./endpoints.json").then((results) => {
    const parsedResults = JSON.parse(results);
    return parsedResults;
  });
};

const fetchAllArticles = () => {
  return db
    .query(
      `
    SELECT 
      articles.author, 
      articles.title, 
      articles.topic, 
      articles.article_id, 
      articles.created_at, 
      articles.votes, 
      articles.article_img_url, 
      COUNT(comments.comment_id) AS comment_count
    FROM articles
    LEFT JOIN comments ON articles.article_id = comments.article_id
    GROUP BY articles.article_id
    ORDER BY articles.created_at DESC
  `
    )
    .then((res) => {
      return res.rows;
    });
};

const fetchArticleById = (id) => {
  if (id === undefined || !typeof id === "number") {
    return Promise.reject({ status: 400, msg: "Bad Request" });
  }
  return db
    .query(
      `
    SELECT * FROM articles
    WHERE article_id = $1
    `,
      [id]
    )
    .then((results) => {
      if (results.rows.length === 0) {
        return Promise.reject({ status: 404, msg: "Bad Request" });
      } else {
        return results.rows[0];
      }
    });
};

const fetchCommentsByArticleId = (articleId) => {
  if (articleId === undefined || !typeof articleId === "number") {
    return Promise.reject({ status: 400, msg: "Bad Request" });
  }
  return db
    .query(
      `
    SELECT * FROM comments
    WHERE article_id = $1
    ORDER BY created_at DESC

    `,
      [articleId]
    )
    .then((res) => {
      if (res.rows.length === 0) {
        return Promise.reject({ status: 404, msg: "Bad Request" });
      } else {
        return res.rows;
      }
    });
};

const insertComment = (newComment, articleId) => {
  const { username, body } = newComment;
  return db
    .query(
      `
      INSERT INTO comments (author, body, article_id)
      VALUES
      ($1, $2, $3) RETURNING *
    `,
      [username, body, articleId]
    )
    .then((res) => {
      return res.rows[0];
    });
};

module.exports = {
  fetchAllTopics,
  fetchAllEndpoints,
  fetchArticleById,
  fetchAllArticles,
  fetchCommentsByArticleId,
  insertComment,
};
