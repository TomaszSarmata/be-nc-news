const fetchAllTopics = require("../models/api.models");

const getAllTopics = (req, res) => {
  fetchAllTopics();
  res.status(200).send();
};

module.exports = { getAllTopics };
