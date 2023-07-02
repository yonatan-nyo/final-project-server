const User = require("../models/user");
const { signToken } = require("../helpers/jwt");

class loginController {
  static async login(req, res, next) {
    try {
      const { username, id, socialMedia } = req.body;

      if (!username || typeof username !== "string") {
        throw { statusCode: 400, msg: "Invalid or missing username" };
      }

      // if (!email || typeof email !== "string" || !email.includes("@")) {
      //   return res.status(400).json({ error: "Invalid or missing email" });
      // }

      if (!socialMedia || typeof socialMedia !== "string") {
        return res
          .status(400)
          .json({ error: "Invalid or missing socialMedia" });
      }

      let user = await User.getById(id);

      if (!user) {
        const newUser = await User.create({ username, id, socialMedia });

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
      next(error);
    }
  }
}

module.exports = loginController;
