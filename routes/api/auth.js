const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const User = require("../../models/User");

// @route   GET api/auth
// @desc    Test route
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

module.exports = router;
