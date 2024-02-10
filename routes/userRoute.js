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
  getUserDetails,
  getAllUserDetails,
} = require("../controller/userController");

const { addEmailValidation } = require("../middleware/mailValidation");

const router = require("express").Router();

router.post(
  "/signup",
  upload.single("profileImage"),
  addEmailValidation,
  signup
); // user signup

router.post("/login", login); // user login

router.get("/getAllUserinfo", getAllUserinfo);

router.post("/decode", decodeBase64Img); // decode encoded image to see

router.get("/getUserArticles", getUserArticles); //association user with articles

router.get("/getUserDetails/:id", getUserDetails); // get user details by id

router.get("/getAllUserDetails", getAllUserDetails);

router.get("/getImage/:filename", GetUserImage);

router.put(
  "/updateUserinfo/:id",
  upload.single("profileImage"),
  updateUserinfo
); // update user details

router.get("/getUserinfo/:id", getUserinfo); // get user by id

router.delete("/deleteUserinfo/:id", deleteUserinfo); // delete user

module.exports = router;
