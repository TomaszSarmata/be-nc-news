const express = require("express");
const {
  getAllTopics,
  getAllEndpoints,
  getArticleById,
  getAllArticles,
  getCommentsByArticleId,
} = require("./controllers/api.controllers");

const app = express();

app.get("/api/topics", getAllTopics);

app.get("/api", getAllEndpoints);

app.get("/api/articles", getAllArticles);

app.get("/api/articles/:article_id", getArticleById);

app.get("/api/articles/:article_id/comments", getCommentsByArticleId);

// custom 404 errors for 'route not found'
app.all("*", (req, res) => {
  res.status(404).send({ msg: "Route not found" });
});

// custom errors derived from deliberately rejecting promise at model when data comes back empty
app.use((err, req, res, next) => {
  if (err.status) {
    res.status(err.status).send({ msg: err.msg });
  } else next(err);
});

// errors thrown by psql
app.use((err, req, res, next) => {
  if (err.code === "22P02") {
    res.status(400).send({ msg: "Bad Request" });
  } else next(err);
});

// unidentified errors
app.use((err, req, res, next) => {
  console.log("error:", err);
  res.status(500).send({ msg: "Internal Server Error" });
});

module.exports = app;
