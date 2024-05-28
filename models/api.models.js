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

const fetchArticleById = (id) => {
  console.log(id, "id here at model");
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

module.exports = { fetchAllTopics, fetchAllEndpoints, fetchArticleById };
