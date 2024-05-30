const { error } = require("console");
const db = require("../db/connection.js");
const fs = require("fs/promises");

const fetchAllTopics = (topic) => {
  if (topic) {
    return db
      .query(
        `
    SELECT * FROM topics
    WHERE slug = $1
    `,
        [topic]
      )
      .then((results) => {
        if (!results.rows.length) {
          return Promise.reject({ status: 404, msg: "Invalid topic" });
        }
      });
  } else {
    return db
      .query(
        `
    SELECT * FROM topics
    `
      )
      .then((results) => {
        return results.rows;
      });
  }
};

const fetchAllEndpoints = () => {
  return fs.readFile("./endpoints.json").then((results) => {
    const parsedResults = JSON.parse(results);
    return parsedResults;
  });
};

const fetchAllArticles = (topic) => {
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
      const articles = res.rows;

      if (topic) {
        const filteredArticles = articles.filter(
          (article) => article.topic === topic
        );
        console.log(filteredArticles, "filtered here");
        return filteredArticles;
      } else {
        return articles;
      }
    });
};

const fetchArticleById = (id) => {
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
        return Promise.reject({ status: 404, msg: "Invalid article id" });
      } else {
        return results.rows[0];
      }
    });
};

const checkArticleExists = (articleId) => {
  return db
    .query(
      `
    SELECT * FROM articles 
    WHERE
    article_id = $1
    `,
      [articleId]
    )
    .then(({ rows }) => {
      if (!rows.length) {
        return Promise.reject({ status: 404, msg: "Article id invalid" });
      }
    });
};

const fetchCommentsByArticleId = (articleId) => {
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
      return res.rows;
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

const patchArticle = (newVote, article_id) => {
  const votes = newVote.inc_votes;
  return db
    .query(
      `
  UPDATE articles
  SET votes = votes + $1
  WHERE article_id = $2
  RETURNING *;
  `,
      [votes, article_id]
    )
    .then((res) => {
      if (res.rows.length === 0) {
        return Promise.reject({
          status: 404,
          msg: "The article id does not exist",
        });
      } else {
        return res.rows[0];
      }
    });
};

const checkCommentExists = (commnet_id) => {
  return db
    .query(
      `
    SELECT * FROM comments
    WHERE
    comment_id = $1
    `,
      [commnet_id]
    )
    .then((res) => {
      if (!res.rows.length) {
        return Promise.reject({ status: 404, msg: "Invalid id" });
      }
    });
};

const deleteComment = (comment_id) => {
  return db
    .query(
      `
  DELETE FROM comments
  WHERE
  comment_id = $1
  `,
      [comment_id]
    )
    .then(() => {
      return "Comment deleted";
    });
};

const fetchAllUsers = () => {
  return db
    .query(
      `
    SELECT * FROM users
    `
    )
    .then((res) => {
      return res.rows;
    });
};

module.exports = {
  fetchAllTopics,
  fetchAllEndpoints,
  fetchArticleById,
  fetchAllArticles,
  fetchCommentsByArticleId,
  insertComment,
  patchArticle,
  checkArticleExists,
  deleteComment,
  checkCommentExists,
  fetchAllUsers,
};
