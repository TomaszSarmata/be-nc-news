const {
  fetchAllTopics,
  fetchAllEndpoints,
  fetchArticleById,
} = require("../models/api.models");

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
  fetchAllEndpoints()
    .then((endpoints) => {
      res.status(200).send({ endpoints });
    })
    .catch((err) => {
      next(err);
    });
};

const getArticleById = (req, res, next) => {
  const id = req.params.article_id;
  fetchArticleById(id)
    .then((article) => {
      res.status(200).send({ article });
    })
    .catch((err) => {
      console.log(err, "err from controller");
      next(err);
    });
};

module.exports = { getAllTopics, getAllEndpoints, getArticleById };
