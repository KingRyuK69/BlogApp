const { check, validationResult } = require("express-validator");

exports.addUserValidation = [
  check("name")
    .isLength({ min: 1, max: 100 })
    .withMessage("Invalid name length"),
  check("quantity")
    .isInt({ min: 1, max: 99999 })
    .withMessage("Invalid quantity"),
  check("price").isInt({ min: 1, max: 9999 }).withMessage("Invalid price"),
  check("image").exists().withMessage("Image is required"),
  check("email")
    .isEmail()
    .withMessage("Invalid email")
    .custom((value) => {
      if (!value.endsWith("@shyamsteel.com")) {
        throw new Error("Invalid email domain");
      }
      return true;
    }),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];
