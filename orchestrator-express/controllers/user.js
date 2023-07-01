// userController.js
const axios = require("axios");
const Redis = require("ioredis");
const USER_URL = "http://localhost:4001";

const redis = new Redis({
  port: 17893,
  host: "redis-17893.c292.ap-southeast-1-1.ec2.cloud.redislabs.com",
  password: "gPLuaVrS3WhdiI7uVvK3wHShgLGEB83h",
});

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
        res
          .status(500)
          .json({ error: "An error occurred while processing your request" });
      }
    }
  }

  static async readAllUsers(req, res) {
    try {
      const cache = await redis.get("users");
      if (cache) {
        return res.status(200).json(JSON.parse(cache));
      }

      const response = await axios.get(`${USER_URL}/users/all`);

      await redis.set("users", JSON.stringify(response.data));

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

      await redis.del("users");

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

module.exports = userController;
