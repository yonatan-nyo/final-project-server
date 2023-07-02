const User = require("../models/user");

class userController {
  static async readAllUsers(req, res, next) {
    try {
      const data = await User.findAll();
      if (!data || data.length === 0) {
        return res.status(404).json({
          message: "No users found",
        });
      }

      res.status(200).json({
        message: "Successfully fetched all users",
        data,
      });
    } catch (err) {
      console.log(err);
      next(err);
    }
  }

  static async readProfile(req, res, next) {
    try {
      if (!req.user || !req.user._id) {
        return res.status(400).json({
          message: `Invalid request. User not authenticated.`,
        });
      }

      const _id = req.user._id;
      const user = await User.getById(_id);

      if (!user) {
        return res.status(404).json({
          message: `No user found with ID: ${_id}`,
        });
      }

      res.status(200).json({
        message: `Successfully fetched profile with ID: ${_id}`,
        user,
      });
    } catch (err) {
      console.log(err);
      next(err);
    }
  }

  static async editUsername(req, res, next) {
    try {
      const {
        user: { _id },
        body: { username },
      } = req;

      if (!username || typeof username !== "string" || username.trim() === "") {
        return res.status(400).json({
          message: `Invalid or missing username`,
        });
      }

      const user = await User.getById(_id);

      if (!user) {
        return res.status(404).json({
          message: `No user found with ID: ${_id}`,
        });
      }

      const oldUsername = user.username;

      const updatedUser = await User.edit(_id, username);
      res.status(200).json({
        message: `Successfully updated username of ID: ${_id} from ${oldUsername} to ${username}`,
        updatedUser,
      });
    } catch (err) {
      console.log(err);
      next(err);
    }
  }
}

module.exports = userController;
