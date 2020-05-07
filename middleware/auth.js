const jwt = require("jsonwebtoken");
const config = require("config");

// the goal of this middelware is to verify the jwt token
// and if valid get the user id from it, this can then be used
//
module.exports = (req, res, next) => {
  // get token from the header
  const token = req.header("x-auth-token");
  if (!token) {
    return res.status(401).json({ msg: "No token, authorizaiton denied" });
  }
  try {
    // uncrypt the token to get the user data
    const decoded = jwt.verify(token, config.get("jwtSecret"));
    // note: only the user id has been stored in the token
    req.user = decoded.user;
    // on to the next step
    next();
  } catch (err) {
    return res.status(401).json({ msg: "Token is not valid" });
  }
};
