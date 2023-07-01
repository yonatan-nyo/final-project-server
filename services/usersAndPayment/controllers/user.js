const User = require("../models/user");

class userController {
  static async readAllUsers(req, res, next) {
    try {
      const data = await User.findAll();
      res.status(200).json({
        message: "Successfully fetched all users",
        data,
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        message: "Error occurred while fetching all users",
      });
    }
  }

  static async readProfile(req, res, next) {
    try {
      // const {
      //   user: { _id },
      // } = req;

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
      res.status(500).json({
        message: "Error occurred while fetching user profile",
      });
    }
  }

  static async editUsername(req, res, next) {
    try {
      const {
        user: { _id },
        body: { username },
      } = req;

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
      res.status(500).json({
        message: "Error occurred while updating username",
      });
    }
  }
}

module.exports = userController;
