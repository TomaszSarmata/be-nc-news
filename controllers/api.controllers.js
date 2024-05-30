const {
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

  const promises = [
    checkArticleExists(articleId),
    fetchCommentsByArticleId(articleId),
  ];

  Promise.all(promises)
    .then((resolvedPromises) => {
      const comments = resolvedPromises[1];
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
      res.status(201).send({ comment });
    })
    .catch((err) => {
      next(err);
    });
};

const updateComment = (req, res, next) => {
  const articleId = req.params.article_id;
  patchArticle(req.body, articleId)
    .then((article) => {
      res.status(200).send({ article });
    })
    .catch((err) => {
      next(err);
    });
};

const removeComment = (req, res, next) => {
  const { comment_id } = req.params;

  const promises = [checkCommentExists(comment_id), deleteComment(comment_id)];

  Promise.all(promises)
    .then((resolvedPromises) => {
      const deletedComment = resolvedPromises[1];
      res.status(204).send();
    })
    .catch((err) => {
      next(err);
    });
};

const getAllUsers = (req, res, next) => {
  console.log("in the controller");
  fetchAllUsers().then((users) => {
    res.status(200).send({ users });
  });
};

module.exports = {
  getAllTopics,
  getAllEndpoints,
  getArticleById,
  getAllArticles,
  getCommentsByArticleId,
  addComment,
  updateComment,
  removeComment,
  getAllUsers,
};
