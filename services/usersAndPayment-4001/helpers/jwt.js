const jwt = require("jsonwebtoken");
const secret = "SuperSecret";

// login
const signToken = (payload) => {
  return jwt.sign(payload, secret);
};

// autentikasi
const verifyToken = (token) => {
  return jwt.verify(token, secret);
};

module.exports = {
  signToken,
  verifyToken,
};
