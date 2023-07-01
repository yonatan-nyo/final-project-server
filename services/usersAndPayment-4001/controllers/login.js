// Kontroler login
const User = require("../models/user");
const { signToken } = require("../helpers/jwt");

class loginController {
  static async login(req, res) {
    try {
      const { username, email, socialMedia } = req.body;

      let user = await User.getCollections().findOne({ email });

      if (!user) {
        const newUser = await User.create({ username, email, socialMedia });

        const token = signToken({
          id: newUser._id,
          username: newUser.username,
          socialMedia: newUser.socialMedia,
        });

        res.status(201).json({
          message: "User created successfully",
          newUser,
          token,
        });
      } else {
        const token = signToken({
          id: user._id,
          username: user.username,
          socialMedia: user.socialMedia,
        });

        res.status(200).json({
          message: "Logged in successfully",
          user,
          token,
        });
      }
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ error: "An error occurred while processing your request" });
    }
  }
}

module.exports = loginController;
