const { verifyToken } = require("../helpers/jwt");
const { ObjectId } = require("mongodb");
const User = require("../models/user");

const authentication = async (req, res, next) => {
  try {
    const { token } = req.headers;
    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    const payload = verifyToken(token);
    const user = await User.getCollections().findOne({
      _id: new ObjectId(payload.id),
    });

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    req.user = user;
    next();
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error authenticating user" });
  }
};

module.exports = authentication;
