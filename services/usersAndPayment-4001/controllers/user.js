const User = require("../models/user");

class userController {
  static async readProfile(req, res, next) {
    try {
      const _id = req.user._id;
      const user = await User.getById(_id);

      res.status(200).json({
        message: `Successfully fetched profile with ID: ${_id}`,
        user,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = userController;
