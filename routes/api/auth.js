const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const { check, validationResult } = require("express-validator");

const auth = require("../../middleware/auth");
const User = require("../../models/User");

// @route   GET api/auth
// @desc    User login authorizaton route
// @access  Public
// when sending this the req.header needs to have a key of
// x-auth-token with a value of the actual token in order to
// succesfully get authorized
router.get("/", auth, async (req, res) => {
  try {
    // find the user by using the user id in the header token populated
    // by the middelware auth.js
    const user = await User.findById(req.user.id).select("-password");
    // return the user
    return res.json(user);
  } catch (error) {
    return res.status(500).send("Server error");
  }
});

// @route   POST api/auth
// @desc    Authenticate user & get token
// @access  Public
// note: validation is a 2nd parameter before (req.res)
// parameters: field name , error message and
// then a chain of validators
router.post(
  "/",
  // do validation first and then check in (res,req)
  [
    check("email", "Please enter valid email address").isEmail(),
    check("password", "Password is required").exists(),
  ],
  async (req, res) => {
    // get validation errors if any
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    // console.log(req.body);
    // get fields using destructuring
    const { email, password } = req.body;
    try {
      // See if user exists
      let user = await User.findOne({ email });
      if (!user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Invalid Credentials" }] });
      }
      // user found, now match if password matches
      // compare provided user password with encrypted one
      const isMatch = bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Invalid Credentials" }] });
      }
      // Return jsonwebtoken
      // the payload will contain the user id from mongodb atlas
      const payload = {
        user: {
          id: user.id,
        },
      };
      // sign payload and set the expires in to 3600 (hour)
      // for testing added 2 zeros so it will be longer
      jwt.sign(
        payload,
        config.get("jwtSecret"),
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          return res.json({ token });
        }
      );
      // return res.send("User created");
    } catch (err) {
      console.error(err.message);
      return res.status(500).send("Server error");
    }
  }
);

module.exports = router;
