const {
  addArticle,
  getAllArticles,
} = require("../controller/articleController"); // article controller

const router = require("express").Router();

router.post("/addArticle", addArticle); //articles post

router.get("/getAllArticles", getAllArticles); //articles get all

module.exports = router;
