const User = require("../models/user");

class userController {
  static async readProfile(req, res, next) {
    const _id = req.user._id;
    const user = await User.getById(_id);

    res.status(200).json({
      message: `Successfully fetched profile with ID: ${_id}`,
      user,
    });
  }

  static async editUsername(req, res, next) {
    try {
      const {
        user: { _id },
        body: { username },
      } = req;

      if (!username || typeof username !== "string" || username.trim() === "") {
        throw { statusCode: 400, msg: "Invalid or missing username" };
      }

      const user = await User.getById(_id);
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
