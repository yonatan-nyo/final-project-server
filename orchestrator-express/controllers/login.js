const axios = require("axios");
const { USER_URL } = require("../config/api");

class loginController {
  static async login(req, res, next) {
    try {
      const { username, id, socialMedia } = req.body;

      const response = await axios.post(`${USER_URL}/login`, {
        username,
        id,
        socialMedia,
      });

      res.status(response.status).json(response.data);
    } catch (error) {
      console.error(error);

      if (error.response) {
        res.status(error.response.status).json(error.response.data);
      } else {
        res
          .status(500)
          .json({ error: "An error occurred while processing your request" });
      }
    }
  }
}

module.exports = loginController;
