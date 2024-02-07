const db1 = require("../models");

const Article = db1.user_articles;

const addArticle = async (req, res) => {
  let data = {
    title: req.body.title,
    body: req.body.body,
  };

  const user_articles = await Article.create(data);
  res.status(200).json({
    error: false,
    result: user_articles,
    msg: "Review added successfully",
  });
};

const getAllArticles = async (req, res) => {
  const user_articles = await Article.findAll({});
  res
    .status(200)
    .json({
      error: false,
      result: user_articles,
      msg: "All requested Articles",
    });
};

module.exports = {
  addArticle,
  getAllArticles,
};
