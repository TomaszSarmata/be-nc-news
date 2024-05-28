const express = require("express");
const { getAllTopics } = require("./controllers/api.controllers");

const app = express();

app.get("/api/topics", getAllTopics);

module.exports = app;
