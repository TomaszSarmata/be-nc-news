const express = require("express");
const { getAllTopics } = require("./controllers/api.controllers");

const app = express();

app.get("/api/topics", getAllTopics);

app.all("*", (req, res) => {
  res.status(404).send({ msg: "Route not found" });
});

app.use((err, req, res, next) => {
  if (err.status && err.msg) {
    res.status(err.status).send({ msg: err.msg });
  } else {
    res.status(500).send({ msg: "Internal Sever Error" });
  }
});

module.exports = app;
