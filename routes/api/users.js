const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator/check");

// @route   GET api/users
// @desc    Test route
// @access  Public
router.get("/", (req, res) => res.send("Users route"));

// @route   POST api/users
// @desc    Register user
// @access  Public
// note: validation is a 2nd parameter before (req.res)
// parameters: field name , error message and
// then a chain of validators
router.post(
  "/",
  // do validation first and then check in (res,req)
  [
    check("name", "Name is required").not().isEmpty(),
    check("email", "Please enter valid email address").isEmail(),
    check(
      "password",
      "Please enter a password with 6 or more characters"
    ).isLength({ min: 6 }),
  ],
  (req, res) => {
    // get validation errors if any
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    console.log(req.body);
    res.send("Users route");
  }
);

module.exports = router;
