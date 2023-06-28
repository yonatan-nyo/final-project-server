const { getDatabase } = require("../config/connectionMongoDB");
const { ObjectId } = require("mongodb");
const User = require("../models/user");

class userController {
  static async readAllUsers(req, res, next) {
    try {
      const data = await User.findAll();

      res.status(200).json(data);
    } catch (err) {
      console.log(err);
      res.status(500).json({
        message: "Internal server error",
      });
    }
  }
}

module.exports = userController;
