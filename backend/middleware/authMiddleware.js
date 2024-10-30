const jwt = require("jsonwebtoken");
const User = require("../models/user");
const authMiddleware = (req, res, next) => {
  let token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, "mysecret", (err, decodedValue) => {
      if (err) {
        return res.status(401).json({ message: "token unauthendicated" });
      } else {
        User.findById(decodedValue._id).then((user) => {
          req.user = user;
          next();
        });
      }
    });
  } else {
    return res.status(400).json({ message: "token need to provide" });
  }
};

module.exports = authMiddleware;
