const { fetchAllTopics, fetchAllEndpoints } = require("../models/api.models");

const getAllTopics = (req, res, next) => {
  fetchAllTopics()
    .then((topics) => {
      res.status(200).send({ topics });
    })
    .catch((err) => {
      next(err);
    });
};

const getAllEndpoints = (req, res, next) => {
  //   console.log("hello from controller");
  fetchAllEndpoints().then((endpoints) => {
    res.status(200).send({ endpoints });
  });
};

module.exports = { getAllTopics, getAllEndpoints };