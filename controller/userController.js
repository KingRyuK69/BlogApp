const db1 = require("../models");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const base64 = require("base64-img");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { Op } = require("sequelize");

require("dotenv").config();

//create main model
const User_info = db1.users_info;
const Article = db1.user_articles;

// Multer configuration
const fileStorageEngine = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./images");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "--" + file.originalname);
  },
});

require("dotenv").config();

const upload = multer({
  storage: fileStorageEngine,
  limits: {
    fileSize: parseInt(process.env.FILE_SIZE_LIMIT), // limits file size to 5mb in .env (parse from)
  },
  fileFilter: (req, file, cb) => {
    let ext = path.extname(file.originalname);
    let allowedFileTypes = process.env.ALLOWED_FILE_TYPES.split(",");
    if (!allowedFileTypes.includes(ext)) {
      req.fileValidationError = "Wrong extension";
      return cb(null, false, req.fileValidationError);
    }
    cb(null, true);
  },
});

const signup = async (req, res) => {
  const data = {
    fullname: req.body.fullname,
    email: req.body.email,
    phone_no: req.body.phone_no,
    likes: req.body.likes,
    password: req.body.password,
  };

  // const  {
  //   fullname,
  //   email,
  //   phone_no,
  //   likes,
  //   password,
  // } = req.body;

  try {
    const existingUser = await User_info.findOne({
      where: {
        [Op.or]: [{ phone_no: data.phone_no }, { email: data.email }],
      },
    });

    if (existingUser) {
      return res.status(400).json({
        error: true,
        result: null,
        msg: "User already exists",
      });
    } else {
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(data.password, saltRounds);

      // Upload the image
      if (!req.file) {
        let err = new Error("No file uploaded");
        err.status = 400;
        throw err;
      }

      const uploadedFile = req.file;

      // Encode the image
      const imagePath = req.file.path;
      const base64Image = base64.base64Sync(imagePath);

      const newUser = await User_info.create({
        fullname: data.fullname,
        email: data.email,
        phone_no: data.phone_no,
        likes: data.likes,
        password: hashedPassword,
        profileImage: uploadedFile.path,
        base64Image: base64Image,
      });

      return res.status(200).json({
        error: false,
        result: newUser,
        msg: "User created successfully",
      });
    }
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: true, result: null, msg: error.message });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User_info.findOne({ where: { email } });

    if (!user) {
      return res.status(400).json({
        error: true,
        result: null,
        msg: "Invalid Credentials",
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(400).json({
        error: true,
        result: null,
        msg: "Invalid password",
      });
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    return res.status(200).json({
      error: false,
      result: token,
      msg: "User logged in successfully",
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: true, result: fail, msg: error.message });
  }
};

//get all users
const getAllUserinfo = async (req, res) => {
  let user_info = await User_info.findAll({});
  res.status(200).json({ error: false, result: user_info, msg: "All users" });
};

//get a user
const getUserinfo = async (req, res) => {
  let id = req.params.id;
  let user_info = await User_info.findOne({ where: { id: id } });
  res.status(200).json({ error: false, result: user_info, msg: "Single user" });
};

const updateUserinfo = async (req, res) => {
  try {
    const token = req.headers?.Authorization || req.headers?.authorization;
    const secret = process.env.JWT_SECRET;
    const decoded = jwt.verify(token, secret);
    const userId = decoded.id;

    let info = {
      fullname: req.body.fullname,
      email: req.body.email,
      phone_no: req.body.phone_no,
      likes: req.body.likes,
    };

    // Check if a new image file is being uploaded
    if (req.file) {
      const uploadedFile = req.file;
      info.profileImage = uploadedFile.path;

      // Encode the new image
      const base64Image = fs.readFileSync(uploadedFile.path, {
        encoding: "base64",
      });
      info.base64Image = base64Image;
    }

    await User_info.update(info, { where: { id: userId } });

    // Retrieve the updated user information from the database
    const updatedUser = await User_info.findOne({ where: { id: userId } });

    res.status(200).send({
      error: false,
      result: updatedUser,
      msg: "User updated successfully",
    });
  } catch (error) {
    res.status(400).send(error.message);
  }
};

//decode base64 img
const decodeBase64Img = async (req, res) => {
  try {
    const base64String = req.body.image;
    const filename = req.body.filename;
    base64.img(
      base64String,
      "./uploads",
      filename,
      async function (err, filepath) {
        if (err) {
          throw new Error("Failed to save image");
        }
        // Convert the relative path to absolute path
        const absolutePath = path.resolve(filepath);
        // Check if the file exists before sending
        if (fs.existsSync(absolutePath)) {
          res.sendFile(absolutePath);
        } else {
          throw new Error("File not found");
        }
      }
    );
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get user image
const GetUserImage = async (req, res) => {
  try {
    const filename = req.params.filename;
    const filePath = path.join("images", filename);

    if (fs.existsSync(filePath)) {
      res.status(200).download(filePath, filename);
    } else {
      throw new Error("File not found");
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// delete a user
const deleteUserinfo = async (req, res) => {
  let id = req.params.id;
  await User_info.destroy({ where: { id: id } });
  res.status(200).send({ message: "User deleted" });
};

//get user articles with user info
const getUserArticles = async (req, res) => {
  try {
    const data = await User_info.findAll({
      include: [
        {
          model: Article,
          as: "articles",
        },
      ],
      where: { id: 2 },
    });
    res.status(200).json({
      error: false,
      result: data,
      msg: "User Association with Articles",
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// // get user email
// const getUserEmail = async (req, res) => {
//   try {
//     const data = await User_info.findAll({
//       include: [
//         {
//           model: User_email,
//           as: "user_email",
//         },
//         {
//           model: User_desc,
//           as: "user_desc",
//         },
//       ],
//       where: { id: 5 },
//     });
//     res.status(200).json(data);
//   } catch (error) {
//     res.status(500).send(error.message);
//   }
// };

module.exports = {
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
};
