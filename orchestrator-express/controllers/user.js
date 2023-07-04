// userController.js
const axios = require("axios");
const { BUSSINESS_URL, USER_URL } = require("../config/api");

class userController {
  static async getUser(req, res) {
    try {
      const userProfileResponse = await axios({
        url: `${USER_URL}/users/profile`,
        method: "GET",
        headers: {
          token: req.headers.token,
        },
      });

      const UserId = userProfileResponse.data.user._id;

      const userBusinessesResponse = await axios({
        url: `${BUSSINESS_URL}/bussinesses/byUser/${UserId}`,
        method: "GET",
      });
      // console.log("🚀 ~ file: user.js:24 ~ userController ~ getUser ~ userBusinessesResponse:", userBusinessesResponse)

      const userFundsResponse = await axios({
        url: `${USER_URL}/payments/byUser/${UserId}`,
        method: "GET",
      });
      console.log(
        "🚀 ~ file: user.js:28 ~ userController ~ getUser ~ userFundsResponse:",
        userFundsResponse
      );

      const combinedResponseData = {
        userProfile: userProfileResponse.data,
        userBusinesses: userBusinessesResponse.data,
        userFunds: userFundsResponse.data,
      };

      res.status(200).json(combinedResponseData);
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
