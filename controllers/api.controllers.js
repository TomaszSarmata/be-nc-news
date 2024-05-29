const {
  fetchAllTopics,
  fetchAllEndpoints,
  fetchArticleById,
  fetchAllArticles,
  fetchCommentsByArticleId,
  insertComment,
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

const getAllArticles = (req, res, next) => {
  fetchAllArticles()
    .then((articles) => {
      res.status(200).send({ articles });
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
      next(err);
    });
};

const getCommentsByArticleId = (req, res, next) => {
  const articleId = req.params.article_id;
  fetchCommentsByArticleId(articleId)
    .then((comments) => {
      console.log(comments, "data controller");
      res.status(200).send({ comments });
    })
    .catch((err) => {
      next(err);
    });
};

const addComment = (req, res, next) => {
  const articleId = req.params.article_id;
  insertComment(req.body, articleId)
    .then((comment) => {
      console.log(comment, "comment here");
      res.status(201).send({ comment });
    })
    .catch((err) => {
      next(err);
    });
};

module.exports = {
  getAllTopics,
  getAllEndpoints,
  getArticleById,
  getAllArticles,
  getCommentsByArticleId,
  addComment,
};
