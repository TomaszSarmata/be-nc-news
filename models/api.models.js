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
    // console.log(parsedResults, "results here");
    return parsedResults;
  });
};

module.exports = { fetchAllTopics, fetchAllEndpoints };
