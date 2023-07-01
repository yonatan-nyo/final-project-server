const axios = require("axios");
const USER_URL = "http://localhost:4001";

class loginController {
  static async login(req, res) {
    try {
      const { username, email, socialMedia } = req.body;

      const response = await axios.post(`${USER_URL}/login`, {
        username,
        email,
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
