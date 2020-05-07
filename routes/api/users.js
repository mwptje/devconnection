const express = require("express");
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const router = express.Router();
const { check, validationResult } = require("express-validator");

const User = require("../../models/User");

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
  async (req, res) => {
    // get validation errors if any
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    // console.log(req.body);
    // get fields using destructuring
    const { name, email, password } = req.body;
    try {
      // See if user exists
      let user = await User.findOne({ email });
      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "User already exists" }] });
      }
      // Get users gravatar
      const avatar = gravatar.url(email, {
        s: "200",
        r: "pg",
        d: "mm",
      });

      user = new User({
        name,
        email,
        avatar,
        password,
      });
      // Encrypt password
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
      await user.save();

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
