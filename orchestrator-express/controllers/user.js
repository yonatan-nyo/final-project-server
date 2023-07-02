// userController.js
const axios = require("axios");
const USER_URL = "http://localhost:4001";

class userController {
  static async getUser(req, res) {
    try {
      // console.log(req.headers);
      const response = await axios({
        url: `${USER_URL}/users/profile`,
        method: "GET",
        headers: req.headers,
      });

      res.status(response.status).json(response.data);
    } catch (error) {
      console.error(error);

      if (error.response) {
        res.status(error.response.status).json(error.response.data);
      } else {
        res.status(500).json({ error: "An error occurred while processing your request" });
      }
    }
  }

  static async editUsername(req, res) {
    try {
      const {
        body: { username },
      } = req;

      const response = await axios.patch(
        `${USER_URL}/users/profile`,
        {
          username,
        },
        {
          headers: req.headers,
        }
      );

      res.status(response.status).json(response.data);
    } catch (error) {
      console.error(error);

      if (error.response) {
        res.status(error.response.status).json(error.response.data);
      } else {
        res.status(500).json({ error: "An error occurred while processing your request" });
      }
    }
  }
}

module.exports = userController;
