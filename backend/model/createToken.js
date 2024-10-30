const jwt = require("jsonwebtoken");
let maxAge = 3 * 24 * 60 * 60;
const createToken = (_id) => {
  return jwt.sign({ _id }, "mysecret", { expiresIn: maxAge });
};

module.exports = createToken;
