const {
  signup,
  login,
  getAllUserinfo,
  getUserinfo,
  updateUserinfo,
  deleteUserinfo,
  GetUserImage,
  upload,
  decodeBase64Img,
  getUserArticles,
} = require("../controller/userController");

const {
  addArticle,
  getAllArticles,
} = require("../controller/articleController"); // article controller

// const { addEmail, getAllEmail } = require("../controllers/emailController"); // email controller

const { addEmailValidation } = require("../middleware/mailValidation");

const router = require("express").Router();

router.post(
  "/signup",
  upload.single("profileImage"),
  addEmailValidation,
  signup
); // user signup

router.post("/login", login); // user login

router.post("/addArticle", addArticle); //articles post

// router.post("/addEmail", addEmail); //email

router.get("/getAllUserinfo", getAllUserinfo);

router.get("/getAllArticles", getAllArticles); //articles get all

// router.get("/AllEmail", getAllEmail); //email

router.post("/decode", decodeBase64Img); // decode encoded image to see

router.get("/getUserArticles", getUserArticles); //association articles

// router.get("/getEmail", getUserEmail); //association email, reviews with user

router.get("/getImage/:filename", GetUserImage);

router.put(
  "/updateUserinfo/:id",
  upload.single("profileImage"),
  updateUserinfo
); // update user details

router.get("/getUserinfo/:id", getUserinfo); // get user by id

router.delete("/deleteUserinfo/:id", deleteUserinfo); // delete user

module.exports = router;
