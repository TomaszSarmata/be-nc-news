const db = require("../db/connection.js");

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

module.exports = fetchAllTopics;
