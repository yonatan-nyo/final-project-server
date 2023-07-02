const { verifyToken } = require("../helpers/jwt");
const { ObjectId } = require("mongodb");
const User = require("../models/user");

const authentication = async (req, res, next) => {
  try {
    const { token } = req.headers;
    if (!token) throw { statusCode: 401, msg: "No token Provided" };

    const payload = verifyToken(token);
    const user = await User.getById(new ObjectId(payload.id));

    if (!user) throw { statusCode: 401, msg: "User not found" };

    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = authentication;
