const express = require("express");
const { check, validationResult } = require("express-validator");

exports.addEmailValidation = [
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
